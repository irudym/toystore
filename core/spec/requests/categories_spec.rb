# Request to Categories Controller
require 'rails_helper'

RSpec.describe 'Categories API', type: :request do
  # Initialize test data
  let(:user) { create(:user) }
  let!(:categories) { create_list(:category, 5) }
  let(:category_id) { categories.first.id }

  let(:admin_user) { create(:admin_user) }


  context 'Non admin user ' do
    let(:headers) { valid_headers }
    describe 'GET /categories' do
      # make HTTP request before each test
      before { get '/categories', params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'GET /categories/:id' do
      before { get "/categories/#{category_id}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'POST /categories' do
      # valid payload
      let(:valid_attributes) { { name: 'Игрушки', name_eng: 'Toys' }.to_json }
      before { post '/categories', params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'PUT /categories/:id' do
      let(:valid_attributes) { { name: 'Книги' }.to_json }
      before { put "/categories/#{category_id}", params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'DELETE /categories/:id' do
      before { delete "/categories/#{category_id}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end
  end

  context 'Admin user' do
    # authorize request
    let(:headers) {
      custom_valid_headers(admin_user)
    }

    # test suite for GET /categories
    describe 'GET /categories' do
      # make HTTP get request before each test
      before { get '/categories', params: {}, headers: headers }

      it 'returns categories' do
        expect(json).not_to be_empty
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    # test suite for GET /categories/:id
    describe  'GET /categories/:id' do
      before { get "/categories/#{category_id}", params: {}, headers: headers}

      context 'when the record exists' do
        it 'returns the record' do
          expect(json).not_to be_empty
          expect(json['id']).to eq(category_id)
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end

      context 'when the record does not exist' do
        let(:category_id) { 100 }

        it 'returns status code 404' do
          expect(response).to have_http_status(404)
        end

        it 'returns a not found message' do
          expect(response.body).to match(/Couldn't find Category/)
        end
      end
    end

    # test suite for POST /categories
    describe 'POST /categories' do
      # valid payload
      let(:valid_attributes) { { name: 'Игрушки', name_eng: 'Toys' }.to_json }

      context 'when the request is valid' do
        before { post '/categories', params: valid_attributes, headers: headers }

        it 'creates a category' do
          expect(json['name_eng']).to eq('Toys')
        end

        it 'returns status code 201' do
          expect(response).to have_http_status(201)
        end
      end

      context 'when the request is invalid' do
        before { post '/categories', params: { name: 'Test' }.to_json, headers: headers }

        it 'returns status code 422' do
          expect(response).to have_http_status(422)
        end

        it 'returns a validation failure message' do
          expect(response.body).to match(/Validation failed: Name eng can't be blank/)
        end
      end
    end

    # test suite for PUT /categories/:id
    describe 'PUT /categories/:id' do
      let(:valid_attributes) { { name: 'Книги' }.to_json }

      context 'when the record exists' do
        before { put "/categories/#{category_id}", params: valid_attributes, headers: headers }

        it 'updates the record' do
          expect(response.body).to be_empty
        end

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end
      end
    end

    # test suite for DELETE /categories/:id
    describe 'DELETE /categories/:id' do
      before { delete "/categories/#{category_id}", params: {}, headers: headers }

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    # test suite for GET /categories/info
    describe 'GET /categories/info' do
      before { get '/categories/info', params: {}, headers: headers }

      it 'returns information containing numbers of available records' do
        expect(json['available']).to eq(5)
      end

      it 'returns information about how many records in trash bin' do
        expect(json['trash']).to eq(0)
      end
    end
  end
end