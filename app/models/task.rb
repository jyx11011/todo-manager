class Task < ApplicationRecord
  validates :description, presence: true, length: {minimum: 1}
  validates :isDone, inclusion: {in: [true, false]}
end
