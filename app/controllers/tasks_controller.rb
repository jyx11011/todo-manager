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
    @task.destroy
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
    @tasks = Task.all
  end

  private
    def task_params
      params.require(:task).permit(:description, :isDone)
    end
end
