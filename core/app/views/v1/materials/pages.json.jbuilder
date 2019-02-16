json.page @pages[:page]
json.pages @pages[:pages]
json.materials do
  json.array!(@pages[:materials]) do |material|
    json.id material.id
    json.name material.name
    json.name_eng material.name_eng
  end
end