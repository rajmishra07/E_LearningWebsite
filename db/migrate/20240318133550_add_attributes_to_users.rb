class AddAttributesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :address, :string
    add_column :users, :contact, :string
    add_column :users, :DOB, :date
    add_column :users, :Alternate_contact, :string
  end
end
