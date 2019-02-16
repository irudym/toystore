json.array! @materials do |material|
  json.id material.id
  json.name material.name
  json.name_eng material.name_eng
  json.description material.description
end