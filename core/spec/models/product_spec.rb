require 'rails_helper'

RSpec.describe Product, type: :model do

  context 'Validations' do
    it {
      should validate_presence_of(:name)
    }

    it {
      should validate_presence_of(:name_eng)
    }

    it {
      should validate_presence_of(:description)
    }
  end

  context 'Basic methods' do
    let(:brands) { create_list(:brand, 5) }
    let(:materials) { create_list(:material, 5) }
    let(:types) { create_list(:type, 5) }
    let(:categories) { create_list(:category, 5) }
    let(:colours) { create_list(:colour, 5) }

    it 'creates a product record with rereferences to other models by their ids' do
      params = {
        name: 'Test',
        name_eng: 'Test',
        description: 'Just a test product',
        category:  categories.first.id,
        brand: brands.first.id,
        types: [types[0].id, types[1].id],
        materials: [materials[0].id, materials[1].id],
        colours: [colours[0].id, colours[1].id]
      }
      product = Product.create_with_references!(params)

      expect(product.name).to eq('Test')
    end

  end

  context 'Image manipulations' do
    let(:brands) { create_list(:brand, 5) }
    let(:categories) { create_list(:category, 5) }

    it 'creates a product with one image' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)
      expect(product.image_urls.length).to eq(1)
      expect(product.image_urls[0]).to match(/product%20with%20Image/)
    end

    it 'creates product with many images' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)
      expect(product.image_urls.length).to eq(3)
    end

    it 'updates a product with additional image' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)

      new_params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: [product.image_urls[0], 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product.update(new_params)
      expect(product.image_urls.length).to eq(2)
    end

    it 'changes an image at a product' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)

      new_params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: [product.image_urls[0], 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          product.image_urls[2]]
      }
      product.update(new_params)
      expect(product.image_urls.length).to eq(3)
    end

    it 'removes one image from product' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)

      new_params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: [product.image_urls[0], 
          nil,
          product.image_urls[2]]
      }
      product.update(new_params)
      expect(product.image_urls.length).to eq(2)
    end

    it 'removes three images from a product' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)
      new_params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: [nil, 
          0,
          product.image_urls[2],
          0]
      }
      product.update(new_params)
      expect(product.image_urls.length).to eq(1)
    end

    it 'removes three images from a product and clear relation table' do
      params = {
        name: 'product with Image',
        name_eng: 'product with Image',
        description: 'test product with one image',
        brand: brands.first.id,
        category: categories.first.id,
        pictures: ['data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
      }
      product = Product.create_with_references!(params)
      new_params = {
        pictures: [nil, 
          0,
          product.image_urls[2],
          0]
      }
      product.update(new_params)
      expect(product.image_urls.length).to eq(1)
      sql = "SELECT * FROM images_products WHERE product_id='#{product.id}';"
      result = ActiveRecord::Base.connection.execute(sql)
      expect(result.count).to eq(1)
    end
  end

end
