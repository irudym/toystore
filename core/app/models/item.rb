class Item < ManagingRecord
  belongs_to :product
  belongs_to :colour, optional: true
end
