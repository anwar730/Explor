class GoalSerializer < ActiveModel::Serializer
  attributes :id,:goalimage,:name,:saved_money,:total_money,:date,:members_count
end
