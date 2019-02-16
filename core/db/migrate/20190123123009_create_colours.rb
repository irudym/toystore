class CreateColours < ActiveRecord::Migration[5.2]
  def change
    create_table :colours do |t|
      t.string :name
      t.string :name_eng
      t.string :hex
      t.boolean :trash, default: false

      t.timestamps
    end
  end
end
