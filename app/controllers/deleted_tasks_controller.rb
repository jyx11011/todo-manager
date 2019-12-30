class DeletedTasksController < ApplicationController
  def index
    @deletedTasks=Task.where(isDeleted: true)
  end

  def destroy
    if(params[:id])
      @task=Task.find(params[:id])
      @task.destroy
    else
      Task.where(isDeleted: true).destroy_all()
    end
  end

  def recover
    @task=Task.find(params[:id])
    @task.update({isDeleted:false})
  end
end
