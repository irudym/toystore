class V1::ColoursController < ApplicationController
  # only admin has access to categories
  before_action :authenticate_admin
  before_action :set_color, only: [:show, :update, :destroy, :restore]

  def index
    @colours = Colour.available
  end

  def trash
    @colours = Colour.trash_bin
    render :index
  end

  def show
  end

  # POST /colours
  def create
    @colour = Colour.create!(colour_params)
    render :show, status: 201
  end

  # PUT /colours/:id
  def update
    @colour.update(colour_params)
    head :no_content
  end

  # DELETE /categories/:id
  def destroy
    response = @colour.put_to_trash
    json_response(response, 202)
  end

  # PUT /category/trash/:id
  def restore
    @colour.restore
    head :no_content
  end

  # Serve data by pages
  def pages
    @pages = Colour.to_pages(params[:id].to_i)
  end

  # provide amount of records
  def info
    @available = Colour.available.count
    @trash = Colour.trash_bin.count
  end

  private

  def colour_params
    # whitelist params
    params.permit(:name, :name_eng, :hex)
  end

  def set_color
    @colour = Colour.find(params[:id])
  end


end
