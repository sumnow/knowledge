<!--
Created: Mon Aug 26 2019 15:17:23 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:17:23 GMT+0800 (China Standard Time)
-->
# mongodb

mongodb 是一个有名的关系型数据库, 但同时语法又接近sql, 所以适合入门学习.

下面是安装过程, [参考](https://linuxize.com/post/how-to-install-mongodb-on-centos-7/)

## Installing MongoDB

1. Enabling MongoDB repository

To add the MongoDB repository to your system, open your text editor and create a new YUM repository configuration file named `mongodb-org.repo` inside the `/etc/yum.repos.d/` directory:

``` bash
# /etc/yum.repos.d/mongodb-org.repo
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
```

If you want to install an older version of MongoDB, replace each instance of 4.0 with your preferred version.

2. Installing MongoDB

Now that the repository is enabled you can install the mongodb-org meta-package using the yum utility:

``` bash
sudo yum install mongodb-org
```

3. Starting MongoDB

sudo systemctl start mongod
sudo systemctl enable mongod

4. Verifying MongoDB Installation

``` bash
mongod
```

Once you are inside the MongoDB shell type the following command which will display the MongoDB version:

``` bash
db.version()
```

``` output
4.0.1
```

## Configuring MongoDB

You can configure your MongoDB instance by editing the /etc/mongod.conf configuration file which is written in YAML.
The default configuration settings are sufficient in most cases. However, for production environments we recommend uncommenting the security section and enabling authorization as shown below:

``` bash
# /etc/mongod.conf
security:
  authorization: enabled
```

The authorization option enables Role-Based Access Control (RBAC) that regulates users access to database resources and operations. If this option is disabled each user will have access to any database and will be able to execute any action.

After making changes to the MongoDB configuration file, restart the mongod service:

``` bash
# bash
sudo systemctl restart mongod
```

To find more information about the configuration options available in MongoDB 4.0 visit the Configuration File Options documentation page.

## Creating Administrative MongoDB User

If you enabled the MongoDB authentication, create one administrative MongoDB user that you will use to access and manage your MongoDB instance.
First access the mongo shell with:

``` bash
mongo
```

Once you are inside the MongoDB shell type the following command to connect to the admin database:

``` bash
use admin
```

``` output
switched to db admin
```

Create a new user named mongoAdmin with the userAdminAnyDatabase role:

``` bash
db.createUser(
  {
    user: "mongoAdmin", 
    pwd: "changeMe", 
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

``` output
Successfully added user: {
	"user" : "mongoAdmin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
```

You can name the administrative MongoDB user as you want.

Exit the mongo shell with:

``` bash
# bash
quit()
```

To test the changes, access the mongo shell using the administrative user you have previously created:

``` bash
# bash
mongo -u mongoAdmin -p --authenticationDatabase admin
```

``` bash
# bash
use admin
```

``` output
# bash
switched to db admin
```

Now, print the users with:

``` bash
show users
```

``` output
{
	"_id" : "admin.mongoAdmin",
	"user" : "mongoAdmin",
	"db" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}
```

