FactoryBot.define do
  factory :category do
    name { Faker::Commerce.department(1, true) }
    name_eng { Faker::Commerce.department(1, true) }
  end
end