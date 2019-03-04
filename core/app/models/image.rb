class Image < ApplicationRecord
  extend Images
  has_one_attached :image

  def url
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

  def self.create!(params)
    image = super params.except(:image)
    image.image = params[:image] if params[:image]
    image
  end

  # add image from base64 data format (with prefix)
  def image=(data) 
    result = Image.from_base64(data, self.name)
    image.attach(result)
  end

end
