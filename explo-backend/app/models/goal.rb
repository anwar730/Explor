class Goal < ApplicationRecord
  belongs_to :user
  validates :name,:saved_money,:total_money,:date, :members_count, presence: true
end
