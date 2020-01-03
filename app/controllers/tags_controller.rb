class TagsController < ApplicationController
  def new
  end

  def create
    @user=User.find(user_id)
    @tag = @user.tags.create(tag_params)

    render json: @tag
  end

  def destroy
    @user=User.find(user_id)
    @tag=@user.tags.find(params[:id])
    @tag.destroy
    head :no_content
  end

  def update
    @user=User.find(user_id)
    @tag=@user.tags.find(params[:id])
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def index
    @user=User.find(user_id)
    @tags = @user.tags.all
  end

  private
    def tag_params
      params.require(:tag).permit(:name)
    end

    def user_id
      if session[:user_id]
        session[:user_id]
      else
        redirect_to sessions_new_path
      end
    end

end
