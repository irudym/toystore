class Product < ManagingRecord
  belongs_to :category
  has_many_attached :images

  validates_presence_of :name, :name_eng
  
end
