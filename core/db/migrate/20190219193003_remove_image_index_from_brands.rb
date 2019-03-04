class RemoveImageIndexFromBrands < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key "brands", "images"
  end
end
