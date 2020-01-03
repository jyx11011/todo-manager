class TasksController < ApplicationController
  def new
  end

  def create
    @user = user
    if user
      @task = @user.tasks.create(task_params)
      
      render json: @task
    else
      redirect_to sessions_new_path
    end
  end

  def destroy
    @user = user
    if user
      @task=@user.tasks.find(params[:id])
      @task.update({isDeleted: true})
      head :no_content
    else
      redirect_to sessions_new_path
    end
  end

  def update
    @user=user
    if user
      @task=@user.tasks.find(params[:id])
      if @task.update(task_params)
        render json: @task
      else
        render json: @taks.errors, status: :unprocessable_entity
      end
    else
      redirect_to sessions_new_path
    end
  end

  def filter
    @user=user
    if user
      if params[:task]
        tags = params[:task][:tag_ids];
        isDone = params[:task][:isDone];
        if (tags && isDone)
          @tasks = @user.tasks.where(isDeleted: false, isDone: isDone).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
        elsif (tags)
          @tasks=@user.tasks.where(isDeleted: false).joins(:tags).where(tags: {id:params[:task][:tag_ids]}).distinct
        elsif (isDone)
          @tasks=@user.tasks.where(isDeleted: false, isDone: isDone)
        end
      else
        @tasks=@user.tasks.where(isDeleted: false)
      end
      render json: @tasks
    else
      redirect_to sessions_new_path
    end
  end


  def index
    @user=user
    if user
      @tasks = @user.tasks.where(isDeleted: false)
      @tags = @user.tags.all
    else
      redirect_to sessions_new_path
    end
  end

  private
    def task_params
      params.require(:task).permit(:description, :isDone, tag_ids:[])
    end

    def user
      if session[:user_id]!=nil
        return User.find(session[:user_id])
      else
       return nil
      end
    end
end
