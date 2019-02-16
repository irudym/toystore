FactoryBot.define do
  factory :material do
    name { Faker::Color.color_name }
    name_eng { Faker::Color.color_name }
    description { Faker::Color.hex_color}
  end
end