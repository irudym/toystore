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

Due to TrashBin support it recommended to use method **available** to get all available records (where :trash is false) instead of method *all*. To get records which are in TrashBin method **trash** is implemented. 

#### Image support

Due to very hard coded ActiveStorage attachment implementation a wrapper Image created. Image supports setting attachment from base64 string which simplifies image file uploading and storing. Other models should handle :picture/pictures in params to set linked Image. 


### Workaround

During **rspec** test errors with connection to Database could appear, especially after using ActiveStorage related methods. Suggested to add following line to application.rb file:

/# To fix errors with Database clean during tests
config.active_job.queue_adapter = :inline
 
