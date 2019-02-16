require 'rails_helper'


# Test suite for the Category model
RSpec.describe Category, type: :model do
  # Validation tests
  # ensure the model validates name, name_eng before saving
  it {
    should validate_presence_of(:name)
  }

  it {
    should validate_presence_of(:name_eng)
  }
end
