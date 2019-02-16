# Request to Categories Controller
require 'rails_helper'

controller = 'brands'

RSpec.describe 'Brands API', type: :request do
  # Initialize test data
  let(:user) { create(:user) }
  let!(:brands) { create_list(:brand, 5) }
  let(:brand_id) { brands.first.id }

  let(:admin_user) { create(:admin_user) }


  context 'Non admin user ' do
    let(:headers) { valid_headers }
    describe 'GET /brands' do
      # make HTTP request before each test
      before { get "/#{controller}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'GET /brands/:id' do
      before { get "/#{controller}/#{brand_id}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'POST /brands' do
      # valid payload
      let(:valid_attributes) { { name: 'дерево', name_eng: 'wood', description: 'some description' }.to_json }
      before { post "/#{controller}", params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'PUT /brands/:id' do
      let(:valid_attributes) { { name: 'пластик' }.to_json }
      before { put "/#{controller}/#{brand_id}", params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'DELETE /colours/:id' do
      before { delete "/#{controller}/#{brand_id}", params: {}, headers: headers }

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
    describe 'GET /brands' do
      # make HTTP get request before each test
      before { get "/#{controller}", params: {}, headers: headers }

      it 'returns list of brands' do
        expect(json).not_to be_empty
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    # test suite for GET /colours/:id
    describe  'GET /brands/:id' do
      before { get "/#{controller}/#{brand_id}", params: {}, headers: headers}

      context 'when the record exists' do
        it 'returns the record' do
          expect(json).not_to be_empty
          expect(json['id']).to eq(brand_id)
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end

      context 'when the record does not exist' do
        let(:brand_id) { 100 }

        it 'returns status code 404' do
          expect(response).to have_http_status(404)
        end

        it 'returns a not found message' do
          expect(response.body).to match(/Couldn't find Brand/)
        end
      end
    end

    # test suite for POST /brands
    describe 'POST /brands' do
      # valid payload
      let(:valid_attributes) { { name: 'дерево', name_eng: 'wood', description: 'some description' }.to_json }

      context 'when the request is valid' do
        before { post "/#{controller}", params: valid_attributes, headers: headers }

        it 'creates a brand' do
          expect(json['description']).to eq('some description')
        end

        it 'returns status code 201' do
          expect(response).to have_http_status(201)
        end
      end

      context 'when the request is invalid' do
        before { post "/#{controller}", params: {name_eng: 'brand'}.to_json, headers: headers }

        it 'returns status code 422' do
          expect(response).to have_http_status(422)
        end

        it 'returns a validation failure message' do
          expect(response.body).to match(/Validation failed: Name can't be blank/)
        end
      end
    end


    describe 'PUT /brands/:id' do
      let(:valid_attributes) { { name: 'пластик' }.to_json }

      context 'when the record exists' do
        before { put "/#{controller}/#{brand_id}", params: valid_attributes, headers: headers }

        it 'updates the record' do
          expect(response.body).to be_empty
        end

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end
      end
    end

    describe 'DELETE /brands/:id' do
      before { delete "/#{controller}/#{brand_id}", params: {}, headers: headers }

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    describe 'GET /brands/info' do
      before { get "/#{controller}/info", params: {}, headers: headers }

      it 'returns information containing numbers of available records' do
        expect(json['available']).to eq(5)
      end

      it 'returns information about how many records in trash bin' do
        expect(json['trash']).to eq(0)
      end
    end
  end
end