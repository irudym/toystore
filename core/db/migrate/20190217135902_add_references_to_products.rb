class AddReferencesToProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :colours_products, id: false do |t|
      t.integer :colour_id
      t.integer :product_id
    end
    add_index :colours_products, :colour_id
    add_index :colours_products, :product_id

    create_table :materials_products, id: false do |t|
      t.integer :material_id
      t.integer :product_id
    end
    add_index :materials_products, :material_id
    add_index :materials_products, :product_id

    create_table :products_types, id: false do |t|
      t.integer :type_id
      t.integer :product_id
    end
    add_index :products_types, :type_id
    add_index :products_types, :product_id


    add_reference :products, :brand, foreign_key: true
  end
end
