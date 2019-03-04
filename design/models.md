## Models description


#### Categories
The basic types of products such as 'toys', 'books' and so on.
Has two main fields:
* *name* - which describes the name of a category in local language
* *name_eng* - the same name in english

#### Colours
Describes the colours of products. Main fields are:
* *name* - name of the colour in local language
* *name_eng* - name of the colour in english
* *hex* - RGB hex code without # prefix

#### Materials
Describes materials from which products made of. Could be 'wood', 'plastic', 'paper'... The main fields:
* *name* - name of a material in local language
* *name_eng* - name in English
* *description* - short description of the material

#### Brands
Description of brands. 
* *name*
* *name_eng*
* *description*
* image_id - (alias **picture**) - brand image

#### Types 
Different types of products. For example Toys could be musical, wooden, electronic, and so on
* *name*
* *name_eng*
* *description* 

#### Products
Basic description of a product. The fields are following:
* *name* - name in local language
* *name_eng* - name in English
* *description* - an item description
* has_and_belongs_to_many: *materials* - a reference to materials
* has_and_belongs_to_many: *colors* 
* has_and_belongs_to_many: *types*
* belong_to: *category* 
* belong_to: *brand*
* has_many_attached: *images* (alias **pictures**) - a reference to images

Some items could have options to choose from. For example, different colours of the same product. Option selecting leads to choosing a separated object in **Stock**.

#### Stock
Describes the store stock, consist of available items which described by amount and price.
* *product_id* - a reference to product model
* belong_to: *colour* - in case there are many colour options in a related product
* *amount* - quantity of the item
* *price* - the price of the item
* *reserve* - amount of reserved items
* *in_price* - the purchasing price of the item (to calculate a margin)  

#### Window/Shelf
Products on the shopping window
* *product_id*
* *price* - can be different than Stock has
* *discount*, default: 0 - current discount on the product
* *current_image* - image which will be shown in product page (by default is the first image)
