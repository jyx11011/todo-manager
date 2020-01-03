class SessionsController < ApplicationController
  def new
  end

  def create
    @user=User.find_by(name: user_params[:name]).try(:authenticate, user_params[:password])
    if @user
      session[:user_id]=@user.id
      session[:user_name]=@user.name
      flash[:notice]='Congratulation!You have registered successfully'
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def logout
    session.delete(:user_id)
    session.delete(:user_name)
    redirect_to sessions_new_path
  end

  private
    def user_params
      params.require(:user).permit(:name,:password, :password_confirmation)    
    end
end