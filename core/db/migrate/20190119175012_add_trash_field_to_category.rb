class AddTrashFieldToCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :trash, :boolean, default: false
  end
end
