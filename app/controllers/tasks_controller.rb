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

  def filter
    if params[:task]
      tags = params[:task][:tag_ids];
      isDone = params[:task][:isDone];
      if (tags && isDone)
        @tasks = Task.where(isDeleted: false, isDone: false).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
      elsif (tags)
        @tasks=Task.where(isDeleted: false).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
      elsif (isDone)
        @tasks=Task.where(isDeleted: false, isDone: false)
      end
    else
      @tasks=Task.where(isDeleted: false)
    end
    render json: @tasks
  end


  def index
    @tasks = Task.where(isDeleted: false)
  end

  private
    def task_params
      params.require(:task).permit(:description, :isDone, tag_ids:[])
    end
end
