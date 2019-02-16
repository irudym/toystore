class V1::ProductsController < ApplicationController
  def index
    @products = Product.available
  end
end
