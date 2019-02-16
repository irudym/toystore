# Request to Colours Controller
require 'rails_helper'

controller = 'colours'

RSpec.describe 'Colours API::pages', type: :request do
  # Initialize test data
  let!(:colours) { create_list(:colour, 330) }
  let(:colour_id) { colours.first.id }

  let(:user) { create(:admin_user) }
  # authorize request
  let(:headers) {
    custom_valid_headers(user)
  }

  context 'Request data with page number provided' do
    describe 'GET /colours/pages/:id' do
      before { get "/#{controller}/pages/2", params: {}, headers: headers }

      it 'provide 50 records from the second page' do
        expect(json['colours'].length).to eq(50)
      end

      it 'provides the current page number' do
        expect(json['page']).to eq(2)
      end
    end
  end

  context 'Request data from the last page' do
    describe 'GET /colours/pages' do
      before { get "/#{controller}/pages/7", params: {}, headers: headers }

      it 'provides 30 records from the last page' do
        expect(json['colours'].length).to eq(30)
      end

      it 'provide the current page as the last page number' do
        expect(json['page']).to eq(7)
      end
    end
  end
end