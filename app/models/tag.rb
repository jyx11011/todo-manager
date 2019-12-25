class Tag < ApplicationRecord
  validates :name,presence:true,length:{minimum:1},uniqueness: true
  has_and_belongs_to_many :tasks
end
