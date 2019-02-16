## Backend design

Backend implementation is based in Ruby-on-Rails framework and provide access to its services through API.
Backend distinguish two types opf the clients:
* store users
* admin users 

For these two types of clients backend provides different type of accessible APIs. 


#### Images uploading implementation

Only admin users can upload images through API, suggested to use base64 uploading to a server. Base64 encoding increases data size on 33% 
Therefore, base64 is suitable for sending images and small files under 100MB.


   