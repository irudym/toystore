json.array! @categories do |category|
  json.id category.id
  json.name category.name
  json.name_eng category.name_eng
end