class V1::BrandsController < ApplicationController
  # only admin has access to brands list
  before_action :authenticate_admin
  before_action :set_brand, only: [:show, :update, :destroy, :restore]

  def index
    @brands = Brand.available
  end

  def show
  end

  def create
    @brand = Brand.create!(brand_params)
    render :show, status: 201
  end

  def update
    @brand.update(brand_params)
    head :no_content
  end

  def destroy
    response = @brand.put_to_trash
    json_response(response, 202)
  end

  def trash
    @brands = Brand.trash_bin
    render :index
  end

  def restore
    @brand.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Brand.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Brand.available.count
    @trash = Brand.trash_bin.count
  end

  private

  def set_brand
    @brand = Brand.find(params[:id])
  end

  def brand_params
    # whitelist params
    params.permit(:name, :name_eng, :description, :image)
  end
end
