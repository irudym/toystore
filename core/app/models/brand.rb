class Brand < ManagingRecord
  extend Images

  has_one_attached :image
  validates_presence_of :name

  def image_url
    if image.attached?
      Rails.application.routes.url_for(
        controller: 'active_storage/blobs', 
        action: :show, 
        signed_id: image.signed_id, 
        filename: image.filename, 
        host: 'localhost:3030'
      )
    else
      ''
    end
  end

  # add image from base64 data format (with prefix)
  def image=(data) 
    puts "Brand.set_image"
    result = Brand.from_base64(data, self.name)
    image.attach(io: result[:io], filename: result[:filename])
  end

  def self.create!(params)
    basic_params = params.except(:image)
    brand  = super basic_params

    # add an image to the brand
    brand.image = params[:image] if params[:image]
    brand
  end

  def update(params)
    puts "Brand.UPDATE"
    basic_params = params.except(:image)
    super basic_params
    if params[:image] == nil
      # remove image
      image.purge
    elsif params[:image].slice(0,4) == 'data'
      # update the image
      # image.purge
      self.image = params[:image]
    end
  end

end
