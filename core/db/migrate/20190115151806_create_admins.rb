class CreateAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :admins do |t|
      t.references :user, foreign_key: true
      t.integer :level

      t.timestamps
    end
  end
end
