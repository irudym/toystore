FactoryBot.define do
  factory :colour do
    name { Faker::Color.color_name }
    name_eng { Faker::Color.color_name }
    hex { Faker::Color.hex_color}
  end
end