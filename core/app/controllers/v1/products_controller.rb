class V1::ProductsController < ApplicationController
  def index
    @products = Product.available
  end

  private

  def product_params
    params.permit(:name, :name_eng, :description, :pictures, :category, :brand, :types, :materials, :colours)
  end
end
