class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.string :name
      t.string :name_eng
      t.text :description
      t.boolean :trash, default: false

      t.timestamps
    end
  end
end
