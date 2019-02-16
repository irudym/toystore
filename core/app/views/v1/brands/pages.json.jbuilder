json.page @pages[:page]
json.pages @pages[:pages]
json.brands do
  json.array!(@pages[:brands]) do |brand|
    json.id brand.id
    json.name brand.name
    json.name_eng brand.name_eng
  end
end