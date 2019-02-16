class V1::MaterialsController < ApplicationController
  # only admin has access to categories
  before_action :authenticate_admin
  before_action :set_material, only: [:show, :update, :destroy, :restore]
  
  def index
    @materials = Material.available
  end

  def show
  end

  def trash
    @materials = Material.trash_bin
    render :index
  end

  def create
    @material = Material.create!(material_params)
    render :show, status: 201
  end

  def update
    @material.update(material_params)
    head :no_content
  end

  def destroy
    response = @material.put_to_trash
    json_response(response, 202)
  end

  def restore
    @material.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Material.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Material.available.count
    @trash = Material.trash_bin.count
  end

  private

  def set_material
    @material = Material.find(params[:id])
  end

  def material_params
    # whitelist params
    params.permit(:name, :name_eng, :description)
  end
end
