FactoryBot.define do
  factory :product do
    name { Faker::Color.color_name }
    name_eng { Faker::Color.color_name }
    description { Faker::Color.hex_color}
    pictures { ["data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="] }
    brand
    category
  end
end