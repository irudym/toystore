class V1::ProductsController < ApplicationController
  # only admin has access to products
  before_action :authenticate_admin
  before_action :set_product, only: [:show, :update, :destroy, :restore]

  def index
    @products = Product.available
  end

  def trash
    @products = Product.trash_bin
    render :index
  end

  def show
  end

  def create
    @product = Product.create_with_references!(product_params)
    render :show, status: 201
  end

  def update
    # check if pictures are empty, throw error as it's prohibited to create a product without a picture
    unless params[:pictures] 
      json_response({ message: "Cannot update the product without a picture" }, :unprocessable_entity)
    else
      @product.update(product_params)
      head :no_content
    end
  end

  def destroy
    response = @product.put_to_trash
    json_response(response, 202)
  end

  def restore
    @product.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Product.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Product.available.count
    @trash = Product.trash_bin.count
  end


  private

  def product_params
    params.permit(:name, :name_eng, :description, :category, :brand, :pictures => [], :types => [], :materials => [], :colours => [])
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
