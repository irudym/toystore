# Request to Categories Controller
require 'rails_helper'

RSpec.describe 'Categories API::pages', type: :request do
  # Initialize test data
  let!(:categories) { create_list(:category, 330) }
  let(:category_id) { categories.first.id }

  let(:user) { create(:admin_user) }
  # authorize request
  let(:headers) {
    custom_valid_headers(user)
  }

  context "Request data with page number provided" do
    describe 'GET /categories/pages/:id' do
      before { get '/categories/pages/1', params: {}, headers: headers}

      it 'provide 50 records from the second page' do
        expect(json['categories'].length).to eq(50)
      end

      it 'provides the current page number' do
        expect(json['page']).to eq(1)
      end
    end
  end

  context "Request data from the last page" do
    describe 'GET /categories/pages' do
      before { get '/categories/pages/7', params: {}, headers: headers}

      it 'provides 30 records from the last page' do
        expect(json['categories'].length).to eq(30)
      end

      it 'provide the current page as the last page number' do
        expect(json['page']).to eq(7)
      end
    end
  end
end