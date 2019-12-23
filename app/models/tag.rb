class Tag < ApplicationRecord
  validates :name,presence:true,length:{minimum:1}
  has_and_belongs_to_many :tasks
end
