class AddImagesReferencesToProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :images_products, id: false do |t|
      t.integer :image_id
      t.integer :product_id
    end
    add_index :images_products, :image_id
    add_index :images_products, :product_id
  end
end
