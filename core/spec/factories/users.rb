# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { 'foo@bar.com' }
    password { 'foobar' }
  end

  factory :admin_user, class: 'User' do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { 'foo@bar.com' }
    password { 'foobar' }

    after :create do |user|
      create :admin, user: user
    end
  end
end