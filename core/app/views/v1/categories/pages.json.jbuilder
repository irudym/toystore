json.page @pages[:page]
json.pages @pages[:pages]
json.categories do
  json.array!(@pages[:categories]) do |category|
    json.id category.id
    json.name category.name
    json.name_eng category.name_eng
    end
end