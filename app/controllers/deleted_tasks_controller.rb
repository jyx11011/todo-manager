class DeletedTasksController < ApplicationController
  def index
    @user=user
    if user
      @deletedTasks=@user.tasks.where(isDeleted: true)
    else
      redirect_to sessions_new_path
    end
  end

  def destroy
    @user=user
    if user
      if(params[:id])
        @task=@user.tasks.find(params[:id])
        @task.destroy
      else
        @user.tasks.where(isDeleted: true).destroy_all()
      end
    else
      redirect_to sessions_new_path
    end
  end

  def recover
    @user=user
    if user
      @task=@user.tasks.find(params[:id])
      @task.update({isDeleted:false})
    else
      redirect_to sessions_new_path
    end
  end

  private
    def user
      if session[:user_id]!=nil
        return User.find(session[:user_id])
      else
      return nil
      end
    end

end
