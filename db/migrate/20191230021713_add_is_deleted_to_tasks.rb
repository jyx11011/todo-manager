class AddIsDeletedToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :isDeleted, :boolean, default: false
  end
end
