# Request to Categories Controller
require 'rails_helper'

controller = 'products'

RSpec.describe 'Products API', type: :request do
  # Initialize test data
  let(:user) { create(:user) }
  let!(:products) { create_list(:search_product, 1) }
  let(:product_id) { products.first.id }
  let(:categories) { create_list(:category, 3) }
  let(:brands) { create_list(:brand, 3) }
  let(:colours) { create_list(:colour, 3) }
  let(:types) { create_list(:type, 3) }
  let(:materials) { create_list(:material, 4)}

  let(:admin_user) { create(:admin_user) }
  let(:headers) {
    custom_valid_headers(admin_user)
  }

  context 'Search products with provided product\'s brand and category' do
    let (:search_params) { {category: products.first.category.id, brand: products.first.brand.id} }
    before { get "/#{controller}/search", params: search_params, headers: headers }

    it 'returns a response' do
      expect(json).not_to be_empty
    end

    it 'returns products array' do
      expect(json[0]['id']).to eq(product_id)
    end
  end

  context 'Search products with wrong brand or category' do 
    let (:search_params) { {category: products.first.category.id, brand: products.first.brand.id*10} }
    before { get "/#{controller}/search", params: search_params, headers: headers }

    it 'returns an empty response' do
      expect(json).to be_empty
    end
  end

  context 'Search products when category and brands ids equal to -1' do
    let (:search_params) { {category: -1, brand: -1} }
    before { get "/#{controller}/search", params: search_params, headers: headers }

    it 'returns all products' do
      expect(json).not_to be_empty
    end
  end

  context 'Search products by name' do
    let (:search_params) { { name: 'шест' } }
    before { get "/#{controller}/search", params: search_params, headers: headers }

    it 'returns product with provided name' do 
      expect(json[0]['name_eng']).to eq('gears')
    end
  end
end