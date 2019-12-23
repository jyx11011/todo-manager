class TagsController < ApplicationController
  protect_from_forgery :except => :index
  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tag=Tag.find(params[:id])
    @tag.destroy
    head :no_content
  end

  def update
    @tag=Tag.find(params[:id])
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def index
    @tags = Tag.all
    render json: @tags
  end

  private
    def tag_params
      params.require(:tag).permit(:name)
    end
end
