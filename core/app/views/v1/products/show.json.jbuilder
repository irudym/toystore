json.id @product.id
json.name @product.name
json.name_eng @product.name_eng
json.description @product.description
json.created_at @product.created_at
json.brand @product.brand.id
json.category @product.category.id
json.types do
  json.array!(@product.to_ids(:types))
end
json.colours do 
  json.array!(@product.to_ids(:colours))
end
json.materials do
  json.array!(@product.to_ids(:materials))
end
json.pictures do
  json.array!(@product.image_urls)
end
