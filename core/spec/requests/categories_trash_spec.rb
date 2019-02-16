# Request to Categories Controller
require 'rails_helper'

RSpec.describe 'Categories API::trash', type: :request do
  # Initialize test data
  let!(:categories) { create_list(:category, 5) }
  let(:category_id) { categories.first.id }

  let(:user) { create(:admin_user) }
  # authorize request
  let(:headers) {
    custom_valid_headers(user)
  }
  before { delete "/categories/#{category_id}", params: {}, headers: headers}

  context 'Delete for the first time' do

    describe 'DELETE /categories/:id' do
      it 'returns the id of the record' do
        expect(json['id']).to eq(category_id)
      end

      it 'returns trash field with true value' do
        expect(json['trash']).to be_truthy
      end

    end

    describe 'INDEX request' do
      before { get '/categories', params: {}, headers: headers }

      it 'shows decreased amount of records' do
        expect(json.length).to eq(4)
      end
    end

    describe 'TRASH request' do
      before { get '/categories/trash', params: {}, headers: headers }

      it 'shows records in the trash' do
        expect(json.length).to eq(1)
      end
    end
  end

  context 'Delete for the second time' do
    before {
      delete "/categories/#{category_id}", params: {}, headers: headers
    }
    describe 'DELETE /categories/:id' do
      it 'returns the id of the record' do
        expect(json['id']).to eq(category_id)
      end

      it 'returns the trash field with false value' do
        expect(json['trash']).to be_falsey
      end
    end

    describe 'TRASH request' do
      before { get '/categories/trash', params: {}, headers: headers }
      it 'shows decreased amount of available records in trash' do
        expect(json.length).to eq(0)
      end
    end
  end
end