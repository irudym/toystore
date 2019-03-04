FactoryBot.define do
  factory :type do
    name { Faker::Creature::Dog.breed }
    name_eng { Faker::Creature::Dog.breed }
    description { Faker::Creature::Dog.meme_phrase }
  end
end