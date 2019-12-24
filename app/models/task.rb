class Task < ApplicationRecord
  validates :description, presence: true, length: {minimum: 1}
  validates :isDone, inclusion: {in: [true, false]}
  has_and_belongs_to_many :tags

  def as_json(options={})
    super(include: :tags)
  end
end