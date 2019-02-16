# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Rails version - 5.2.2

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* API description


### API description

#### Destroying a record

At the first attempt Controller's destroy method changes field **trash** to false in 
the record, at the second call of the method **destroy** the Controller calls a model 
destroy method and completely deletes the record from DB. 

Controller#destroy response: 
* {id, trash: true} means that the record moved to trash bin
* {id, trash: false} means that the record was deleted from DB
 
