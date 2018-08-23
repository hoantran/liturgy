# MYSQL SETUP

Transforming existing data in MySQL to Firestore format is essential in the functioning of the new version of liturgy site.

Below are simple initial steps:

* Install MySQL to the local system
* Setup the convenient aliases & path (optional)
* Upload the SQL dump to the local MySQL server

## INSTALL MYSQL
Here are the steps to install MySQL on OSX.
Equivalent steps can be done on other systems

* Head to https://dev.mysql.com/downloads/mysql/
* Download the DMG Archive
* Run the DMG and follow the prompts

## PATH & ALIASES
These are mostly for convenient

Add these lines in **~/.bash_profile**

```shell
MYSQL_BIN="/usr/local/mysql/bin"
export PATH=$PATH:$MYSQL_BIN
alias mysql-start='sudo $MYSQL_BIN/mysqld_safe &'
alias mysql-stop='sudo $MYSQL_BIN/mysqladmin shutdown --user=root --password=<your_root_password>'
alias mysql-root='$MYSQL_BIN/mysql --user=root --password=<your_root_password>'
```

It's a bit simpler to use MySQL, no?

## UPLOAD SQL FILE
* pull down the latest github repository for liturgy's version3 branch
* start the local mysql server with ```mysql-start```
* Connect to the local MySQL from command line
* execute ```source <path_of_sql_file_such_as_2018.08.02.worship.sql>```

Now the database activie in the local MySQL server at your disposal.

