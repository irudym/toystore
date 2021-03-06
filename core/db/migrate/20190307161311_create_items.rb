class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.references :product, foreign_key: true
      t.references :colour, foreign_key: true
      t.integer :amount
      t.float :price
      t.boolean :trash, default: false
      t.float :in_price

      t.timestamps
    end
  end
end
