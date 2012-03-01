class AddUsernameAvatarRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string

    add_column :users, :avatar, :string

    add_column :users, :role, :string

  end
end
