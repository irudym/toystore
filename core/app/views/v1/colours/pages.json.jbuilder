json.page @pages[:page]
json.pages @pages[:pages]
json.colours do
  json.array!(@pages[:colours]) do |colour|
    json.id colour.id
    json.name colour.name
    json.name_eng colour.name_eng
    json.hex colour.hex
  end
end