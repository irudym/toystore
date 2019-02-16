class Category < ManagingRecord
  # validations
  validates_presence_of :name, :name_eng
end
