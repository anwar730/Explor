class CreateGoals < ActiveRecord::Migration[8.0]
  def change
    create_table :goals do |t|
      t.string :name
      t.decimal :saved_money
      t.decimal :total_money
      t.date :date
      t.integer :members_count
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
