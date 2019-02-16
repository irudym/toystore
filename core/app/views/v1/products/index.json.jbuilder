json.array! @products do |product|
  json.id product.id
  json.name product.name
  json.name_eng product.name_eng
  json.description product.description
  json.images do
    json.array!(product.images) do |image|
      json.url rails_blob_url(image)
    end
  end
end