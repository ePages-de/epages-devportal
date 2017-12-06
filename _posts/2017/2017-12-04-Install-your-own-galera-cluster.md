---
layout: post
title: Install your own Galera cluster
date: 2017-12-04
header_image: blog-install-your-own-galera-cluster.jpg
category: tech-stories
authors: ["Timo Magnus Haapakoski"]
---

# Install your own Galera cluster

So now as you know what Galera Cluster is, you might want to install one.

First you need to have three servers with CentOS/RH 7 Linux operating system, and later two more for application and loadbalancer respectively.

"Five servers! Doesnt sound that easy!" I hear you say. But it is how galera will be ran for real applications, so it is no use to learn it other way.
There is also a possibility to run Galera on Docker, but we wont be discussing it here. For more information visit [Galera with Docker](http://galeracluster.com/2015/05/getting-started-galera-with-docker-part-1/)

Once you have vms installed and running, we will be referring them as vm-galera01, vm-galera02, vm-galera03, vm-lb and vm-app, regardless how you really named them. Just adapt the upcoming install instructions and config files with your real server names accordingly.

In our example we will use Galera-3 with mysql-5.6. If you have own preferences, feel free to change the versions.

## Repository and binaries
On vm-galera01, vm-galera02 and vm-galera03 servers, add a new yum-repository:

```
cat > /etc/yum.repos.d/galera.repo <<EOF
[galera]
name = Galera
baseurl = http://releases.galeracluster.com/centos/7/x86_64
gpgkey = http://releases.galeracluster.com/GPG-KEY-galeracluster.com
gpgcheck = 1
EOF
```

After repository is in place, install the binaries:
```
yum install galera-3 mysql-wsrep-5.6
```
answer with 'y' when needed.

Remember to repeat the process on all of your Galera servers.

Now you should have Galera binaries installed on your servers.


## Data directories
Because we want to know where our data will be saved, we shall now create a directory named /opt/eproot/mysqldata, /opt/eproot/mysqltmp for temporary data and /var/run/mysqld for the standard processid file. Also lets change their owner to mysql with group mysql:

```
mkdir /opt/eproot/mysqldata/mysql -p
mkdir /opt/eproot/mysqltmp/mysql -p
chown mysql:mysql /opt/eproot/mysqldata -R
chown mysql:mysql /opt/eproot/mysqltmp -R
mkdir /var/run/mysqld/ -p
chown mysql:mysql /var/run/mysqld -R
```

Remember to repeat the process on all of your Galera servers.

## MySQL configuration
Then we need to configure mysql to form a Galera cluster with three nodes.

In this example, we will create three configuration files in directory /etc/my.cnf.d/, one for general Galera-, one for Galera node- and one for general Mysql-configuration. 

It begins with mysql config file, which we will use only to include other config files in directory /etc/my.cnf.d:
```
cat > /etc/my.cnf <<EOF
## all mysql configuration files are in /etc/my.cnf.d directory
!includedir /etc/my.cnf.d/
EOF
```

## General Galera configuration

This configuration file defines where Galera can find the nodes. Please change here the ips "192.168.0.101,192.168.0.102,192.168.0.103" with the real ips of your vm-galera01, vm-galera02 and vm-galera03 respectively:
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

Every node (vm-galera01, vm-galera02, vm-galera03) will need its own configuration file.
Please replace again the ip addresses with the real ip address of your vm-galera01, vm-galera02 or vm-galera03 respectively.
Server-ids are required only if you are planning to replicate into galera, as will be shown later in "Data migration into a Galera cluster" article

On vm-galera01:
```
cat > /etc/my.cnf.d/gnode.galera01.cnf <<EOF
[mysqld]
wsrep_node_name=galera01
wsrep_node_address="192.168.0.101"
bind-address=192.168.0.101

server-id=1001
EOF
```

On vm-galera02:
```
cat > /etc/my.cnf.d/gnode.galera02.cnf <<EOF
[mysqld]
wsrep_node_name=galera02
wsrep_node_address="192.168.0.102"
bind-address=192.168.0.102

server-id=1002
EOF
```

And on vm-galera03:
```
cat > /etc/my.cnf.d/gnode.galera03.cnf <<EOF
[mysqld]
wsrep_node_name=galera03
wsrep_node_address="192.168.0.103"
bind-address=192.168.0.103

server-id=1003
EOF
```

## General Mysql config

Finally there is a configuration file for general Mysql settings.
You can add here all your Mysql settings from your current installation.
Settings given here are not examined in detail within this article, and their optimal values might vary depending on your application.

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
Now all of your configs are in place, you are ready to start and initialize the galera cluster.

The first node must be started with option --wsrep-new-cluster
It will initialize the completely new cluster.

On vm-galera01:
```
service mysql start --wsrep-new-cluster
```

First node should be now running. When in doubt, execute following line:
```
service mysql status
```

as result you should get following:
```
# SUCCESS! MySQL running (pid of your galera-mysql process)
```

If you encounter problems, please refer to error log:
```
less /var/lib/mysql/*.err
```

## Galera user policy

As first, you should change the root password for your cluster. Current auto-generated password is available in /root/.mysql_secret
for viewing it, type:
```
cat /root/.mysql_secret
```

then replace it with YOURNEWPASSWORD which you must create by yourselves
```
/usr/bin/mysqladmin -u root password 'YOURNEWPASSWORD' -p
```
It will ask your old password, which was saved in .mysql_secret. Just type it in.

Now you can log in to your Galera database by typing in your new password:
```
mysql -uroot -p
```

For making things simple, lets delete all users except one root user which has access from everywhere.
Please be cautious as a mistake might lock you out of your database.

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

You should end up with only line, your root user:
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

Congratulations, your first Galera cluster node is now up and running.

## Full Galera cluster

Now go to your vm-galera02 and vm-galera03 and start the mysql process there with:
```
service mysql start
```
If you encounter problems, please refer to error log:
tail -f /var/lib/mysql/*.err

After successful start, log in to the Galera node and check the Galera cluster size and status with following command:
```
mysql -uroot -p
```
```
SHOW GLOBAL STATUS WHERE Variable_name IN ('wsrep_ready', 'wsrep_cluster_size', 'wsrep_cluster_status', 'wsrep_connected');
```

After your status looks like the following, you have successfully installed a Galera cluster:
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

