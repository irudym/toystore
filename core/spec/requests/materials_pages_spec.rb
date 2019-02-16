# Request to materials Controller
require 'rails_helper'

controller = 'materials'

RSpec.describe 'Materials API::pages', type: :request do
  # Initialize test data
  let!(:materials) { create_list(:material, 330) }
  let(:material_id) { materials.first.id }

  let(:user) { create(:admin_user) }
  # authorize request
  let(:headers) {
    custom_valid_headers(user)
  }

  context 'Request data with page number provided' do
    describe 'GET /materials/pages/:id' do
      before { get "/#{controller}/pages/2", params: {}, headers: headers }

      it 'provide 50 records from the second page' do
        expect(json['materials'].length).to eq(50)
      end

      it 'provides the current page number' do
        expect(json['page']).to eq(2)
      end
    end
  end

  context 'Request data from the last page' do
    describe 'GET /materials/pages' do
      before { get "/#{controller}/pages/7", params: {}, headers: headers }

      it 'provides 30 records from the last page' do
        expect(json['materials'].length).to eq(30)
      end

      it 'provide the current page as the last page number' do
        expect(json['page']).to eq(7)
      end
    end
  end
end