# Request to Categories Controller
require 'rails_helper'

controller = 'brands'

RSpec.describe 'Brands API Image support', type: :request do
  let!(:brands) { create_list(:brand_with_image, 5) }
  let(:brand_id) { brands.first.id }
  let(:admin_user) { create(:admin_user) }
  let(:headers) {
    custom_valid_headers(admin_user)
  }

  context 'Admin user works with brands and uses images' do

    describe 'GET /brands/1 request' do
      before { get "/#{controller}/#{brand_id}", params: {}, headers: headers }
      it 'returns description of the brand' do
        expect(json['picture']).not_to be_empty
      end
    end
  end
end