json.array! @products do |product|
  json.id product.id
  json.name product.name
  json.name_eng product.name_eng
  json.brand product.brand.id
  json.category product.category.id
end