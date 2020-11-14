class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.integer :total_logins
      t.string :first_name
      t.string :last_name
      t.timestamp :last_seen_at
      t.string :last_seen_ip

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
