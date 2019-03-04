class AddReferenceToImageInBrand < ActiveRecord::Migration[5.2]
  def change
    add_reference :brands, :image, foreign_key: true
  end
end
