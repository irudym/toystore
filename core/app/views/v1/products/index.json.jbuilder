json.array! @products do |product|
  json.id product.id
  json.name product.name
  json.name_eng product.name_eng
  json.description product.description
  json.pictures do
    json.array!(product.images) do |image|
      image.url
    end
  end
end