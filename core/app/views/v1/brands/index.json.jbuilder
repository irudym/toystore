json.array! @brands do |brand|
  json.id brand.id
  json.name brand.name
  json.name_eng brand.name_eng
  json.description brand.description
end