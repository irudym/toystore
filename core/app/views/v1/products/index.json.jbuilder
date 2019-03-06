json.array! @products do |product|
  json.id product.id
  json.name product.name
  json.name_eng product.name_eng
  json.description product.description
  json.brand product.brand.id
  json.category product.category.id
  json.types do
    json.array!(product.types) do |type|
      type.id
    end
  end
  json.colours do 
    json.array!(product.colours) do |colour|
      colour.id
    end
  end
  json.pictures do
    json.array!(product.image_urls)
  end
end