class TasksController < ApplicationController
  protect_from_forgery :except => :index
  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task=Task.find(params[:id])
    @task.update({isDeleted: true})
    head :no_content
  end

  def update
    @task=Task.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @taks.errors, status: :unprocessable_entity
    end
  end

  def index
    if params[:task] && params[:task][:tag_ids]
      tags = params[:task][:tag_ids];
      if(tags==='all') 
        @tasks = Task.where(isDeleted: false)
      else
        @tasks=Task.where(isDeleted: false).includes(:tags).where(tags: {id:params[:task][:tag_ids]})
      end
      render json: @tasks
    else
      puts 'all'
      @tasks = Task.where(isDeleted: false)
    end
  end

  private
    def task_params
      params.require(:task).permit(:description, :isDone, tag_ids:[])
    end
end
