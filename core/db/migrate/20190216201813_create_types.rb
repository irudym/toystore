class CreateTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :types do |t|
      t.string :name
      t.string :name_eng
      t.text :description
      t.boolean :trash, default: false
      
      t.timestamps
    end
  end
end
