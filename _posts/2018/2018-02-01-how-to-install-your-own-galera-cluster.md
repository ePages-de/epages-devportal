---
layout: post
title: How to install your own Galera Cluster
date: 2018-02-01
header_image: install-galera-cluster.jpg
header_position: center
category: tech-stories
tags: ["galera", "mysql", "database"]
authors: ["Timo H."]
---

Now that you know what a [Galera Cluster](/blog/tech-stories/high-availability-with-mysql-galera-cluster/) is, you might want to install one.

First, you need three servers with CentOS/RH 7 Linux operating system, and later two more for application and load balancer, respectively.

"Five servers! Doesn't sound that easy!" I hear you say.
But this is how Galera will run in real applications, so it is no use learning it another way.
There is also a possibility to run Galera on Docker, but we will not discuss it here.
For more information, visit [Galera with Docker](http://galeracluster.com/2015/05/getting-started-galera-with-docker-part-1){:target="_blank"}.

Once you have the VMs up and running, we will be referring them as _vm-galera01_, _vm-galera02_, _vm-galera03_, _vm-lb_, and _vm-app_, regardless of how you really named them.
Just adapt the upcoming installation instructions and config files with your real server names accordingly.

In our example, we will use Galera-3 with mysql-5.6.
If you have own preferences, feel free to change the versions.

## Repository and binaries

On _vm-galera01_, _vm-galera02_, and _vm-galera03_ servers, add a new yum-repository:

```
cat > /etc/yum.repos.d/galera.repo <<EOF
[galera]
name = Galera
baseurl = http://releases.galeracluster.com/centos/7/x86_64
gpgkey = http://releases.galeracluster.com/GPG-KEY-galeracluster.com
gpgcheck = 1
EOF
```

After the repository is in place, install the binaries:
```
yum install galera-3 mysql-wsrep-5.6
```

Answer with `y` if required.
Remember to repeat the process for all of your Galera servers.

Now you should have Galera binaries installed on your servers.

## Data directories

As we want to know where our data will be saved, we will now create a directory named _/opt/eproot/mysqldata_, _/opt/eproot/mysqltmp_ for temporary data and _/var/run/mysqld_ for the standard processed file.
Also, lets change their owner to _mysql_ with group mysql:

```
mkdir /opt/eproot/mysqldata/mysql -p
mkdir /opt/eproot/mysqltmp/mysql -p
chown mysql:mysql /opt/eproot/mysqldata -R
chown mysql:mysql /opt/eproot/mysqltmp -R
mkdir /var/run/mysqld/ -p
chown mysql:mysql /var/run/mysqld -R
```

Remember to repeat the process for all of your Galera servers.

## MySQL configuration

Next, we need to configure mySQL to form a Galera Cluster with three nodes.

In this example, we will create three configuration files in directory _/etc/my.cnf.d/_: one for the general Galera configuration, one for the Galera node configuration, and one for the general MySQL configuration.

It starts with the mysql config file, which we will use only to include other config files in the directory _/etc/my.cnf.d_:

```
cat > /etc/my.cnf <<EOF
## all mysql configuration files are in /etc/my.cnf.d directory
!includedir /etc/my.cnf.d/
EOF
```

## General Galera configuration

This configuration file defines where Galera can find the nodes.
Change here the IPs `192.168.0.101`, `192.168.0.102`, and `192.168.0.103` with the real IPs of your _vm-galera01_, _vm-galera02_ and _vm-galera03_ respectively:

```
cat > /etc/my.cnf.d/gcluster.cnf <<EOF
[mysqld]
wsrep_provider=/usr/lib64/galera-3/libgalera_smm.so
wsrep_provider_options="gcache.size=1G; gcache.page_size=500M"
wsrep_cluster_name="epages_cluster"
wsrep_cluster_address="gcomm://192.168.0.101,192.168.0.102,192.168.0.103"
wsrep_sst_method=rsync
EOF
```

## Galera node config

Every node (_vm-galera01_, _vm-galera02_, _vm-galera03_) will need its own configuration file.
Please replace again the IP addresses with the real IP address of your _vm-galera01_, _vm-galera02_ or _vm-galera03_ respectively.
Server IDs are required only if you are planning to replicate into Galera.
This will be shown in the next post about "How to migrate data into a Galera Cluster".

On _vm-galera01_:

```
cat > /etc/my.cnf.d/gnode.galera01.cnf <<EOF
[mysqld]
wsrep_node_name=galera01
wsrep_node_address="192.168.0.101"
bind-address=192.168.0.101

server-id=1001
EOF
```

On _vm-galera02_:

```
cat > /etc/my.cnf.d/gnode.galera02.cnf <<EOF
[mysqld]
wsrep_node_name=galera02
wsrep_node_address="192.168.0.102"
bind-address=192.168.0.102

server-id=1002
EOF
```

And on _vm-galera03_:

```
cat > /etc/my.cnf.d/gnode.galera03.cnf <<EOF
[mysqld]
wsrep_node_name=galera03
wsrep_node_address="192.168.0.103"
bind-address=192.168.0.103

server-id=1003
EOF
```

## General MySQL config

Finally, there is a configuration file for general MySQL settings.
You can add here all your MySQL settings from your current installation.
Settings given here are not examined in detail within this post, and their optimal values might vary depending on your application.

```
cat > /etc/my.cnf.d/mysql.cnf <<EOF
[mysqld]
user=mysql
port=3306

socket=/opt/eproot/mysqldata/mysql.sock
pid-file=/var/run/mysqld/mysqld.pid

datadir=/opt/eproot/mysqldata/mysql
innodb_data_home_dir=/opt/eproot/mysqldata/mysql
innodb_data_file_path = ibdata1:10M:autoextend
innodb_log_group_home_dir=/opt/eproot/mysqldata/mysql
innodb_log_files_in_group = 2
innodb_log_file_size = 256M
tmpdir=/opt/eproot/mysqltmp/mysql

character-set-server=utf8
collation-server=utf8_bin

default_storage_engine=innodb
innodb_autoinc_lock_mode=2

lower_case_table_names=1
sql_mode=ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE,NO_ZERO_IN_DATE,STRICT_ALL_TABLES,STRICT_TRANS_TABLES,TRADITIONAL,ONLY_FULL_GROUP_BY

log-error=mysql_error.log
general_log_file=mysql_query.log
general_log=0
slow_query_log_file=mysql_slow.log
slow_query_log=0
long_query_time=10

binlog_format=ROW
log_bin=mysql-bin.log
log_bin_index=mysql-bin.log.index
relay-log=relay-bin
relay-log_index=relay-bin.index
log_slave_updates=1
expire_logs_days=24

query_cache_type=2
query_cache_size=10M
table_open_cache=2000
table_definition_cache=20000

innodb_file_per_table=1
innodb_buffer_pool_size=256M
innodb_open_files=300
innodb_log_buffer_size=50M

max_heap_table_size=100M
tmp_table_size=100M

max_allowed_packet=16M

innodb_flush_log_at_trx_commit=1

[mysql]
socket=/opt/eproot/mysqldata/mysql.sock

[mysqladmin]
socket=/opt/eproot/mysqldata/mysql.sock

[mysqld_safe]
user=mysql
EOF
```

## Galera bootup

Now that all of your configs are in place, you are ready to start and initialize the Galera Cluster.

The first node must be started with the option `--wsrep-new-cluster`.
It will initialize the completely new cluster.

On _vm-galera01_:

```
service mysql start --wsrep-new-cluster
```

The first node should be running now.
When in doubt, execute this:

```
service mysql status
```

As a result you should get the following:

```
# SUCCESS! MySQL running (pid of your galera-mysql process)
```

If you encounter problems, refer to the error log:

```
less /var/lib/mysql/*.err
```

## Galera user policy

At first you should change the root password for your cluster.
The current autogenerated password is available in _/root/.mysql_secret_.
To view it, type:

```
cat /root/.mysql_secret
```

Replace it with `YOURNEWPASSWORD`:

```
/usr/bin/mysqladmin -u root password 'YOURNEWPASSWORD' -p
```

You will be asked for your old password, which was saved in _.mysql_secret_.
Just type it in.

Now you can log in to your Galera database by entering your new password:

```
mysql -uroot -p
```

For making things simple, lets delete all users except for one root user which has access from everywhere.
Be careful as a mistake might lock you out of your database.

```
select user,host,password from mysql.user;
CREATE USER 'root'@'%' IDENTIFIED BY 'YOURNEWPASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
use mysql;
delete from user where host='localhost' and user='root';
delete from user where host='vm-galera01';
delete from user where host='vm-galera02';
delete from user where host='vm-galera03';
delete from user where host='::1';
delete from user where host='127.0.0.1';
delete from user where host='localhost';
FLUSH PRIVILEGES;
select user,host,password from mysql.user;
```

You should end up with only one line, which is your root user:
```
#+------+------+---------------------------------------------+
#| user | host | password                                    |
#+------+------+---------------------------------------------+
#| root | %    | *(hash of your password here, do not share) |
#+------+------+---------------------------------------------+
```

You should test it with an another terminal:
```
mysql -uroot -p
```

Congratulations, your first Galera Cluster node is now up and running.

## Full Galera Cluster

Go to your _vm-galera02_ and _vm-galera03_, and start the mySQL process with:

```
service mysql start
```

If you encounter problems, refer to the error log:

```
tail -f /var/lib/mysql/*.err
```

After successful start, log in to the Galera node, and check the Galera Cluster size and status with the following command:

```
mysql -uroot -p
```
```
SHOW GLOBAL STATUS WHERE Variable_name IN ('wsrep_ready', 'wsrep_cluster_size', 'wsrep_cluster_status', 'wsrep_connected');
```

Once your status looks like the following, you have successfully installed a Galera Cluster:

```
#+----------------------+---------+
#| Variable_name        | Value   |
#+----------------------+---------+
#| wsrep_cluster_size   | 3       |
#| wsrep_cluster_status | Primary |
#| wsrep_connected      | ON      |
#| wsrep_ready          | ON      |
#+----------------------+---------+
```

## Related posts

[High availability with MySQL Galera Cluster](/blog/tech-stories/high-availability-with-mysql-galera-cluster/)
