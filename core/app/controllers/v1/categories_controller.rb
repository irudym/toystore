class V1::CategoriesController < ApplicationController
  # only admin has access to categories
  before_action :authenticate_admin
  before_action :set_category, only: [:show, :update, :destroy, :restore]

  # GET /categories
  def index
    @categories = Category.available
  end

  def trash
    @categories = Category.trash_bin
    render :index
  end

  def show
  end

  # POST /categories
  def create
    @category = Category.create!(category_params)
    render :show, status: 201
  end

  # PUT /categories/:id
  def update
    @category.update(category_params)
    head :no_content
  end

  # DELETE /categories/:id
  def destroy
    response = @category.put_to_trash
    json_response(response, 202)
  end

  # PUT /category/trash/:id
  def restore
    @category.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Category.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Category.available.count
    @trash = Category.trash_bin.count
  end

  private

  def category_params
    # whitelist params
    params.permit(:name, :name_eng, :description)
  end

  def set_category
    @category = Category.find(params[:id])
  end
end
