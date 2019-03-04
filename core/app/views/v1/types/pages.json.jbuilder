json.page @pages[:page]
json.pages @pages[:pages]
json.types do
  json.array!(@pages[:types]) do |type|
    json.id type.id
    json.name type.name
    json.name_eng type.name_eng
  end
end