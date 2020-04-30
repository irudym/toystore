## Controllers description


#### Product
Manage product records
Additional methods:
* *search* - find a product by it's name and name_eng and other params (such as brand,  category) 

#### Stock 
Operates with Item
Main methods:
* *to_reserve* - move item to reserve, check that reserve count doesn't not exceed overall amount
* *to_available* - move item to available
* *reserve* - list all items in reserve (where reserve > 0)