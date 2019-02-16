# Request to materials Controller
require 'rails_helper'

controller = 'materials'

RSpec.describe 'Materials API::trash', type: :request do
  # Initialize test data
  let!(:materials) { create_list(:material, 5) }
  let(:material_id) { materials.first.id }

  let(:user) { create(:admin_user) }
  # authorize request
  let(:headers) {
    custom_valid_headers(user)
  }
  before { delete "/#{controller}/#{material_id}", params: {}, headers: headers}

  context 'Delete for the first time' do

    describe 'DELETE /materials/:id' do
      it 'returns the id of the record' do
        expect(json['id']).to eq(material_id)
      end

      it 'returns trash field with true value' do
        expect(json['trash']).to be_truthy
      end

    end

    describe 'INDEX request' do
      before { get "/#{controller}", params: {}, headers: headers }

      it 'shows decreased amount of records' do
        expect(json.length).to eq(4)
      end
    end

    describe 'TRASH request' do
      before { get "/#{controller}/trash", params: {}, headers: headers }

      it 'shows records in the trash' do
        expect(json.length).to eq(1)
      end
    end
  end

  context 'Delete for the second time' do
    before {
      delete "/#{controller}/#{material_id}", params: {}, headers: headers
    }
    describe 'DELETE /materials/:id' do
      it 'returns the id of the record' do
        expect(json['id']).to eq(material_id)
      end

      it 'returns the trash field with false value' do
        expect(json['trash']).to be_falsey
      end
    end

    describe 'TRASH request' do
      before { get "/#{controller}/trash", params: {}, headers: headers }
      it 'shows decreased amount of available records in trash' do
        expect(json.length).to eq(0)
      end
    end
  end
end