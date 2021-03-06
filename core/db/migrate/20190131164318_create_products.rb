class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :name_eng
      t.text :description
      t.references :category, foreign_key: true
      t.boolean :trash, default: false

      t.timestamps
    end
  end
end
