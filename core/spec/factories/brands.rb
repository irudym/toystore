FactoryBot.define do
  factory :brand do
    name { Faker::Color.color_name }
    name_eng { Faker::Color.color_name }
    description { Faker::Color.hex_color}
  end

  factory :brand_with_image, class: 'Brand' do
    name { Faker::Color.color_name }
    name_eng {Faker::Color.color_name }
    description { Faker::Color.color_name }
    image { "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" }
  end
end