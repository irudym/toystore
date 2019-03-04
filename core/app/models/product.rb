class Product < ManagingRecord
  has_and_belongs_to_many :images

  belongs_to :category
  belongs_to :brand
  has_and_belongs_to_many :materials
  has_and_belongs_to_many :colours
  has_and_belongs_to_many :types 

  validates_presence_of :name, :name_eng, :description

  def self.create_with_references!(params) 
    category = Category.find(params[:category])
    brand = Brand.find(params[:brand])
    materials = Material.find(params[:materials])
    colours = Colour.find(params[:colours])
    types = Type.find(params[:types])

    params[:category] = category
    params[:brand] = brand
    product = Product.create!(params.except(:materials, :colours, :types))
    if product
      product.materials = materials if materials
      product.colours = colours if colours
      product.types = types if types
    end
    product
  end

  # return array of image urls
  def image_urls
    self.images.map do |image|
      image.url
    end
  end

  # add images from base64 data format (with prefix)
  def pictures=(data) 
    result = data.map.with_index do |image, index|
      add_image = Image.create!(name: "#{self.name}-#{index}", image: image)
      self.images << add_image
    end
  end
  
  def self.create!(params)
    basic_params = params.except(:pictures)
    product  = super basic_params
    
    # add an image to the brand
    product.pictures = params[:pictures] if params[:pictures]
    product
  end

  def update(params)
    basic_params = params.except(:pictures)
    super basic_params

    params[:pictures].each.with_index  do |image, index|
      if image == nil
        self.images.delete(self.images[index])
      elsif image.slice(0,4) == 'data'
        add_image(image, index)
      end
    end
  end

  def add_image(data, index)
    if index < self.images.length
      self.images[index].image = data
    else
      add_image = Image.create!(name: "#{self.name}-#{index}", image: data)
      self.images << add_image
    end
  end

end
