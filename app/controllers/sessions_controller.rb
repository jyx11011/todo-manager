class SessionsController < ApplicationController
  def new
  end

  def create
    @user=User.find_by(name: user_params[:name]).try(:authenticate, user_params[:password])
    if @user
      puts session[:user_id]
      session[:user_id]=@user.id
      #redirect_to tasks_path
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:password, :password_confirmation)    
  end
end