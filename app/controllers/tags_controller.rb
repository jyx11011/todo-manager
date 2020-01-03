class TagsController < ApplicationController
  def new
  end

  def create
    @user=user
    if @user && tag_params
      if !@user.tags.exists?(name: params[:tag][:name])
        @tag = @user.tags.create(tag_params)
        render json: @tag
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    else
      redirect_to sessions_new_path
    end
  end

  def destroy
    @user=user
    if @user
      @tag=@user.tags.find(params[:id])
      @tag.destroy
      head :no_content
    else
      redirect_to sessions_new_path
    end
  end

  def update
    @user=user
    if @user 
      @tag=@user.tags.find(params[:id])
      if @tag.update(tag_params)
        render json: @tag
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    else
      redirect_to sessions_new_path
    end
  end

  def index
    @user=user
    if @user
      @tags = @user.tags.all
    else
      redirect_to sessions_new_path
    end

  end

  private
    def tag_params
      params.require(:tag).permit(:name)
    end

    def user
      if session[:user_id]!=nil
        return User.find(session[:user_id])
      else
       return nil
      end
    end

end
