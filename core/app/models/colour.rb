class Colour < ManagingRecord
  # validations
  validates_presence_of :name, :name_eng, :hex
end
