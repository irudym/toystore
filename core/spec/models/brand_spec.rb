require 'rails_helper'

RSpec.describe Brand, type: :model do
  let!(:brands) { create_list(:brand_with_image, 3) }
  let(:brand_id) { brands.first.id }

  it {
    should validate_presence_of(:name)
  }

  it 'creates a brand without image' do
    brand = Brand.create!(name: 'test brand', name_eng: 'test brand', description: 'just a brand')
    expect(brand.name).to eq('test brand')
  end

  it 'creates a brand with image in base64 format' do
    brand = Brand.create!(
      name: 'test brand',
      name_eng: 'test brand',
      description: 'just a brand',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    )
    expect(brand.image.attached?).to be_truthy
    expect(brand.image_url).not_to be_empty
  end

  it 'updates a record without changing the image' do
    brand = Brand.find(brand_id)
    image_url =  brand.image_url
    params = {
      name: 'test brand',
      name_eng: 'test brand',
      description: 'just a brand',
      image: image_url,
    }
    brand.update(params)
    expect(brand.image.attached?).to be_truthy
    expect(brand.image_url).to eq(image_url)
  end

  it 'updates the record with new image' do
    brand = Brand.find(brand_id)
    image_url =  brand.image_url
    params = {
      name: 'test brand',
      name_eng: 'test brand',
      description: 'just a brand',
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    }
    brand.update(params)
    expect(brand.image.attached?).to be_truthy
    expect(brand.image_url).not_to eq(image_url)
  end

  it 'updates the record with empty image and deletes the attachment' do
    brand = Brand.find(brand_id)
    params = {
      name: 'test brand',
      name_eng: 'test brand',
      description: 'just a brand',
      image: nil
    }
    brand.update(params)
    expect(brand.image.attached?).to be_falsy
    expect(brand.image_url).to be_empty
  end

end
