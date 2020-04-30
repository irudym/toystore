# Request to Categories Controller
require 'rails_helper'

controller = 'products'

RSpec.describe 'Products API', type: :request do
  # Initialize test data
  let(:user) { create(:user) }
  let!(:products) { create_list(:product, 5) }
  let(:product_id) { products.first.id }
  let(:categories) { create_list(:category, 3) }
  let(:brands) { create_list(:brand, 3) }
  let(:colours) { create_list(:colour, 3) }
  let(:types) { create_list(:type, 3) }
  let(:materials) { create_list(:material, 4)}

  let(:admin_user) { create(:admin_user) }


  context 'Non admin user ' do
    let(:headers) { valid_headers }
    describe 'GET /products' do
      # make HTTP request before each test
      before { get "/#{controller}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'GET /products/:id' do
      before { get "/#{controller}/#{product_id}", params: {}, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'POST /products' do
      # valid payload
      let(:valid_attributes) { { name: 'дерево', name_eng: 'wood', description: 'some description' }.to_json }
      before { post "/#{controller}", params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'PUT /products/:id' do
      let(:valid_attributes) { { name: 'пластик' }.to_json }
      before { put "/#{controller}/#{product_id}", params: valid_attributes, headers: headers }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end

    describe 'DELETE /colours/:id' do
      before { delete "/#{controller}/#{product_id}", params: {}, headers: headers }

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
    describe 'GET /products' do
      # make HTTP get request before each test
      before { get "/#{controller}", params: {}, headers: headers }

      it 'returns list of products' do
        expect(json).not_to be_empty
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    # test suite for GET /colours/:id
    describe  'GET /products/:id' do
      before { get "/#{controller}/#{product_id}", params: {}, headers: headers}

      context 'when the record exists' do
        it 'returns the record' do
          expect(json).not_to be_empty
          expect(json['id']).to eq(product_id)
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end

      context 'when the record does not exist' do
        let(:product_id) { 100 }

        it 'returns status code 404' do
          expect(response).to have_http_status(404)
        end

        it 'returns a not found message' do
          expect(response.body).to match(/Couldn't find Product/)
        end
      end
    end

    # test suite for POST /products
    describe 'POST /products' do
      # valid payload
      let(:valid_attributes) { { name: 'машинка', name_eng: 'car', description: 'some description', 
        category: categories.first.id, brand: brands.first.id, 
        colours: [colours.first.id, colours.second.id], types: [types.first.id, types.second.id],
        materials: [materials.first.id, materials.second.id],
        pictures: ["data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="] }.to_json }

      context 'when the request is valid' do
        before { post "/#{controller}", params: valid_attributes, headers: headers }

        it 'creates a product' do
          expect(json['description']).to eq('some description')
        end

        it 'returns status code 201' do
          expect(response).to have_http_status(201)
        end
      end

      context 'when the request is invalid' do
        before { post "/#{controller}", params: {name_eng: 'product'}.to_json, headers: headers }

        it 'returns status code 404' do
          expect(response).to have_http_status(404)
        end

        it 'returns a validation failure message' do
          expect(response.body).to match(/Couldn't find Category without an ID/)
        end
      end
    end


    describe 'PUT /products/:id' do
      let(:valid_attributes) { { name: 'игрушка', pictures: ["data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="] ,
        category: categories.second.id, types: [types.third.id] }.to_json }

      context 'when the record exists' do
        before { put "/#{controller}/#{product_id}", params: valid_attributes, headers: headers }

        it 'updates the record' do
          expect(response.body).not_to be_empty
        end

        it 'returns status code 202' do
          expect(response).to have_http_status(202)
        end
      end
    end

    describe 'DELETE /products/:id' do
      before { delete "/#{controller}/#{product_id}", params: {}, headers: headers }

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    describe 'GET /products/info' do
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