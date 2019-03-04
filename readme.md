# Toystore
---

Implementation of e-commerce store. Consist of three sub projects:
* frontend - frontend based on Vue
* director - administrative admin portal based on React.JS
* core - backend based on RoR (API server)


#### Directories structure

* design - UI and data design of the solution
* frontend - the store client side implementation
* director - the store admin portal implementation
* core - API backend realisation

#### Dependencies installation

##### MariaDB / MySQL

At first install MariaDB, for MacOS the command are following (assuming using brew):
~~~
  brew install mariadb

  brew services start mariadb
~~~

The last command add mariadb server to auto-start.
After that install MariaDB client connector for linux:
~~~
  sudo apt-get install libmariadbd-dev
~~~

Next, run security update to set root passwords and improve DB security:
~~~
  mysql_secure_installation`
~~~

As soon as installation is finish, login to MariDB console and create toystore
database (test, development, and production) by invoking following commands:
~~~
  create database store_test default character set utf8 default collate utf8_bin;

  create database store_development default character set utf8 default collate utf8_bin;

  create database store_production default character set utf8 default collate utf8_bin;`
~~~

Create a user named *toystore* with the password from ENV[:TOYSTORE_PASSWORD] and grant this user all privileges on the pac database.
Ensure the database can be connected to from any host (%) and the local host.
~~~
  GRANT ALL PRIVILEGES ON store_test.* to toystore@'%' IDENTIFIED BY '{password from ENV}';
  GRANT ALL PRIVILEGES ON store_test.* to toystore@'localhost' IDENTIFIED BY '{password from ENV}';

  GRANT ALL PRIVILEGES ON store_development.* to toystore@'%' IDENTIFIED BY '{password from ENV}';
  GRANT ALL PRIVILEGES ON store_development.* to toystore@'localhost' IDENTIFIED BY '{password from ENV}';

  GRANT ALL PRIVILEGES ON store_production.* to toystore@'%' IDENTIFIED BY '{password from ENV}';
  GRANT ALL PRIVILEGES ON store_production.* to toystore@'localhost' IDENTIFIED BY '{password from ENV}';
~~~

#### Workarounds

##### Mysql2 gem installation

During mysql2 gem installation error with linking of openssl libs could occur. In that case suggested to create symbolic links to openssl libraries:
~~~
  ln -s /usr/local/Cellar/openssl/1.0.2q/lib/libssl.dylib /usr/local/lib/
  ln -s /usr/local/Cellar/openssl/1.0.2q/lib/libcrypto.dylib /usr/local/lib/
~~~
