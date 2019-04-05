class Brand < ManagingRecord
  belongs_to :image, optional: true
  validates_presence_of :name

  # DEPRECATED
  def image_url
    picture_url
  end

  def picture_url
    if self.image
      image.url
    else
      ""
    end 
  end

  # add image from base64 data format (with prefix)
  def picture=(data) 
    add_image = Image.create!(name: self.name, image: data)
    # destroy prev image
    self.image.destroy if self.image
    self.image.delete if self.image
    self.update(image: add_image)
  end

  def self.create!(params)
    basic_params = params.except(:picture)
    brand  = super basic_params

    # add an image to the brand
    brand.picture = params[:picture] if params[:picture]
    brand
  end

  def update(params)
    basic_params = params.except(:picture)

    super basic_params
    return {} if params[:picture] != nil 

    if params[:picture] == nil
      self.image.delete() if self.image
      self.image = nil
    elsif params[:picture].slice(0,4) == 'data'
      # update the image
      self.picture = params[:picture]
    end
  end

  def destroy
    self.image.destroy
    super
  end

end
