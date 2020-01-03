class TasksController < ApplicationController
  def new
  end

  def create
    @user = User.find(user_id)
    @task = @user.tasks.create(task_params)
    
    render json: @task
  end

  def destroy
    @user = User.find(user_id)
    @task=@user.tasks.find(params[:id])
    @task.update({isDeleted: true})
    head :no_content
  end

  def update
    @user=User.find(user_id)
    @task=@user.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @taks.errors, status: :unprocessable_entity
    end
  end

  def filter
    @user=User.find(user_id)
    if params[:task]
      tags = params[:task][:tag_ids];
      isDone = params[:task][:isDone];
      if (tags && isDone)
        @tasks = @user.tasks.where(isDeleted: false, isDone: false).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
      elsif (tags)
        @tasks=@user.tasks.where(isDeleted: false).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
      elsif (isDone)
        @tasks=@user.tasks.where(isDeleted: false, isDone: false)
      end
    else
      @tasks=@user.tasks.where(isDeleted: false)
    end
    render json: @tasks
  end


  def index
    @user=User.find(user_id)
    @tasks = @user.tasks.where(isDeleted: false)
  end

  private
    def task_params
      params.require(:task).permit(:description, :isDone, tag_ids:[])
    end

    def user_id
      if session[:user_id]
        session[:user_id]
      else
        redirect_to sessions_new_path
      end
    end
end
