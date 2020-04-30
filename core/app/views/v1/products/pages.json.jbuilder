json.page @pages[:page]
json.pages @pages[:pages]
json.products do
  json.array!(@pages[:products]) do |product|
    json.id product.id
    json.name product.name
    json.name_eng product.name_eng
    json.category do 
      json.id product.category.id
      json.name product.category.name
    end
    json.pictures do
      json.array!(product.image_urls)
    end
  end
end