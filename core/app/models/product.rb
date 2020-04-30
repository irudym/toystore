class Product < ManagingRecord
  include Toids

  has_and_belongs_to_many :images

  belongs_to :category
  belongs_to :brand
  has_and_belongs_to_many :materials
  has_and_belongs_to_many :colours
  has_and_belongs_to_many :types 

  validates_presence_of :name, :name_eng, :description, :category, :brand

  def self.create_with_references!(params) 
    category = Category.find(params[:category])
    brand = Brand.find(params[:brand])
    materials = Material.find(params[:materials]) if params[:materials]
    colours = Colour.find(params[:colours]) if params[:colours]
    types = Type.find(params[:types]) if params[:types]

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
    basic_params = params.except(:pictures,:types, :materials, :colours, :category, :brand)
    basic_params[:category] = Category.find(params[:category]) if params[:category]
    basic_params[:brand] = Brand.find(params[:brand]) if params[:brand]
    basic_params[:types] = Type.find(params[:types]) if params[:types]
    basic_params[:materials] = Material.find(params[:materials]) if params[:materials]
    basic_params[:colours] = Colour.find(params[:colours]) if params[:colours]
    super basic_params

    puts "\n==============\mDEBUG: should update pictures: #{params[:pictures]}!\n=============\n"

    update_pictures(params[:pictures]) if params[:pictures]
  end

  def update_pictures(pictures)
    new_images = []
    pictures.each.with_index do |image, index|
      if image != 0 && image != nil
        if image.slice(0,4) == 'data'
          new_images << Image.create!(name: "#{self.name}-#{index}", image: image)
        else
          new_images << self.images[index]
        end
      end
    end
    # update list of images
    self.images = new_images
  end

  def add_image(data, index)
    if index < self.images.length
      self.images[index].image = data
    else
      add_image = Image.create!(name: "#{self.name}-#{index}", image: data)
      self.images << add_image
    end
  end

  def self.search(params)
    products = []
    if params[:name]
      # TODO: need to check params[:brand] and params[:category]
      products = Product.where("name LIKE :search", search: "%#{params[:name]}%")
    elsif params[:category] && params[:brand]
      brand = params[:brand]
      category = params[:category]
      if category == "-1" && brand == "-1" 
        products = Product.available
      else
        products = Product.where(category_id: category, brand_id: brand)
      end
    end
    products
  end

end
