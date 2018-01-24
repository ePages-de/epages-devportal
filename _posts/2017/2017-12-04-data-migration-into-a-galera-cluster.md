---
layout: post
title: Data migration into a Galera cluster
date: 2017-12-04
header_image: blog-galera-data-migration-into-a-galera-cluster.jpeg
category: tech-stories
authors: ["Timo Magnus Haapakoski"]
---

# Data migration into a Galera cluster

Your own Galera cluster is proudly up and running, but there is no data on it.

If you have a new application, you can count yourself lucky and could deploy it straight away on your Galera cluster as if it were a normal Mysql database.

However, sooner or later you will have a situation, where you have to import old data into a Galera cluster. If it is live-data, it should be doable without downtime.

## Plan

{% highlight italic %}
"Well planned is halfway done, and halfway done is mostly enough"
-old Finnish proverb
{% endhighlight %}

Normally if MySQL database is running as replication slave, it cannot be configured as replication slave for an another MySQL master. Galera replication is however not MySQL replication, so in addition to Galera multi-master replication, we can have normal MySQL replication, either to feed data into the cluster, or source the data to external database, in example for business intelligence uses.

We will thus initialize a replication from current live-MySQL towards Galera cluster, and after replication is running nicely, we will point application towards the loadbalancer of galera cluster, minimizing the downtime of the operation to mere seconds.

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-migration.png" %}

MySQL replication can replicate into one Galera cluster node, which then replicates the changes through Galera replication to all other cluster nodes. Please note that during the replication process you have to connect directly on that one Galera cluster node, because the replicaton configuration can exist only on one node at the time, it is not cluster wide configuration.

## Replication initialization

Target Galera cluster has alread its own mysql-, information_schema- and performance_schema-databases, so we want to omit those from the replication dump.
```
DBS=$( mysql --defaults-file=/etc/my.cnf --column-names=0 \
-e "select schema_name from information_schema.schemata \
    where schema_name not in ( 'information_schema', 'mysql', 'performance_schema' );" 2>/dev/null | tr '\n' ' ')
echo $ALL_DBS_FOR_INSTANCE
```

Then a dump must be created from current live database:
```
mysqldump --defaults-file=/etc/my.cnf --databases ${DBS} --master-data=1 \
  --single-transaction --ignore-table=mysql.inventory  | gzip -c1 > dump_for_replication.dmp.gz
```

**Note**:
If you have views which use direct mysql-users in your databases, you should at this point create those users also temporarily on the Galera cluster. Otherwise missing users might lead to dump loading errors. If you do, please remember to remove those temporary users at the end of the migration.

Before loading the replication-dump on Galera cluster, lets configure first galera node to have the current liveserver as replication master. In reverse it means that first galera node becomes replication slave to current liveserver.

In the CHANGE MASTER command below, please change IPOFLIVEDATABASE with the ip of your live database. Also replace REPLICATIONUSERNAME and REPLICATIONPASSWORD with your user name and password of your mysql replication user. If you do not have a mysql replication user on your live database, please create it with following command:
```
CREATE USER 'REPLICATIONUSERNAME'@'%' IDENTIFIED BY 'REPLICATIONPASSWORD';
GRANT REPLICATION SLAVE ON *.* TO 'REPLICATIONUSERNAME'@'%';
```
If you do not want to replicate the full database, limit the user above accordingly.

After all previous prerequisites are fulfilled, you may configure your first galera node to have a replication master:

```
CHANGE MASTER TO
         MASTER_HOST='IPOFLIVEDATABASE',
         MASTER_PORT='3306',
         MASTER_USER='REPLICATIONUSERNAME',
         MASTER_PASSWORD='REPLICATIONPASSWORD';
```

As replication is prepared on first galera node, lets go back on your live database server.

If you have a large database-dump, like they usually are, it is recommended to use nohup utility program for avoiding disturbances while loading the data. Therefore we will create a small loading script, which in turn will be ran with nohup.

```
cat >> loadDump.sh < "EOF
#!/bin/bash
dumpfile=$1
gzip -cd  < ${dumpfile} |  mysql --defaults-file=/tmp/galera01.cnf --host=10.12.130.11 --port=3576
EOF
```

In the defaults-file /tmp/galera01.cnf you must have proper creditentials for root user on your first galera node.
Please replace again IPOFFIRSTGALERANODE, USERNAMEONFIRSTGALERANODE and PASSWORDONFIRSTGALERANODE with your first galera node ip, username and password respectively.

```
cat >> /tmp/galera01.cnf < "EOF
[client]
host='IPOFFIRSTGALERANODE'
port='3306'
user='USERNAMEONFIRSTGALERANODE'
password='PASSWORDONFIRSTGALERANODE'
EOF
```

When all bits and pieces are in place, begin the dump loading with nohup:

```
nohup /opt/eproot/Shared/Packages/loadDump.sh dump_for_replication.dmp.gz > loadDump.log 2>&1 &
```

You can observe the dump loading process by tailing the logfile:
```
tail -f loadDump.log
```

## Essence of Time itself

[Time](https://en.wikipedia.org/wiki/Time){:target="_blank"}

Be patient, loading can take very long time.

## Start replicating

After replication dump is finally loaded, you can check that your replication is properly configured:
```
mysql --defaults-file=/tmp/galera01.cnf
SHOW SLAVE STATUS\G
```

If everything matches to the settings configured earlier, you can start the replication:
```
mysql --defaults-file=/tmp/galera01.cnf
START SLAVE;
```

After replication slave status item "seconds behind master" reaches 0, your replication is running orderly.
You may now choose a suitable date for switching the application towards loadbalancer of galera cluster.

## Switch

You should train the following procedure on your testsystem, for having minimal downtime.

First close your live application. This can mean either shutting down your application completely, or configuring maintenance web page on your weblayer loadbalancer.

After all application-related database connections are closed towards your live-database you can stop your replication.
```
mysql --defaults-file=/tmp/galera01.cnf
STOP SLAVE;
```
All changes to your live-database after this point will be lost, so make sure the application database activity is really off.

If you have some special database views, which depend on mysql users, now is your time to fix them on galera side. If you dont, they will be causing problem later on. Preferably plan beforehand all actions through, to keep things quick.

After all last-minute actions are done, you should reset the replication.

```
mysql --defaults-file=/tmp/galera01.cnf
RESET SLAVE;
```

For being sure, that no false data will be replicated, point replication master to non-existing source:
```
mysql --defaults-file=/tmp/galera01.cnf
CHANGE MASTER TO
         MASTER_HOST='SOMEIP',
         MASTER_PORT=3307,
         MASTER_USER='NOBODY',
         MASTER_PASSWORD='NOPASS';
```

If you dont have further databases to migrate, you might also just restart your galera cluster node after RESET SLAVE, for cleaning the replication configuration.

Now old live-database can be shut down, and application can be pointed towards loadbalancer of your galera cluster.

Congratulations, you have successfully migrated your data to Galera cluster!

If you happen to have further database, feel free to repeat the process as often as you need to. Please notice that replicating into Galera will affect the cluster performance, especially during loading the replication dump.

Every scenario should be tested thoroughly on properly configured testsystem. Galera replication is a delicate construction and things can go awry when using unorthodox methods like extra replication discussed here.

## All's Well That Ends Well

Having your live-data now running in Galera-cluster, you can be proud for eliminating yet another risk to your platform. No need to worry about faults on single components.

Galera is no silver bullet. All components will still need normal maintenance, and you should still take regular backups of your data.
Difference is however, that you may now decide more freely, when the maintenance should take place, and it will be invisible for the end customer. Except if they happen to read about it on a dev-blog article ;)
