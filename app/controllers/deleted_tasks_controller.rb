class DeletedTasksController < ApplicationController
  def index
    @user=User.find(user_id)
    @deletedTasks=@user.tasks.where(isDeleted: true)
  end

  def destroy
    @user=User.find(user_id)
    if(params[:id])
      @task=@user.tasks.find(params[:id])
      @task.destroy
    else
      @user.tasks.where(isDeleted: true).destroy_all()
    end
  end

  def recover
    @user=User.find(user_id)
    @task=@user.tasks.find(params[:id])
    @task.update({isDeleted:false})
  end

  private
    def user_id
      if session[:user_id]
        session[:user_id]
      else
        redirect_to sessions_new_path
      end
    end
end
