class User < ApplicationRecord
  has_secure_password
  has_many :goals, dependent: :destroy
  validates :email, presence: true
  validates :username, presence: true, uniqueness: { case_sensitive: true }
  validates :password, confirmation: true , :length => {:within => 6..40}
 
end
