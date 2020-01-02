class User < ApplicationRecord
  validates :name,presence:true,length:{minimum:1},uniqueness: true
  validates :password_digest, presence: true
  has_secure_password

end
