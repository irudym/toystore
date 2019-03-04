class V1::TypesController < ApplicationController
  # only admin has access to types
  before_action :authenticate_admin
  before_action :set_type, only: [:show, :update, :destroy, :restore]

  def index
    @types = Type.available
  end

  def trash
    @types= Type.trash_bin
    render :index
  end

  def show
  end

  # POST /types
  def create
    @type = Type.create!(type_params)
    render :show, status: 201
  end

  # PUT /types/:id
  def update
    @type.update(type_params)
    head :no_content
  end

  # DELETE /categories/:id
  def destroy
    response = @type.put_to_trash
    json_response(response, 202)
  end

  # PUT /category/trash/:id
  def restore
    @type.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Type.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Type.available.count
    @trash = Type.trash_bin.count
  end

  private

  def type_params
    # whitelist params
    params.permit(:name, :name_eng, :description)
  end

  def set_type
    @type = Type.find(params[:id])
  end
end
