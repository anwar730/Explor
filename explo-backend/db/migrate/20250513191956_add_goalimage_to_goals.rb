class AddGoalimageToGoals < ActiveRecord::Migration[8.0]
  def change
    add_column :goals, :goalimage, :string
  end
end
