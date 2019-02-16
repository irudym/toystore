require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  # create a test user
  let!(:user) { create(:admin_user) }
  let(:admin) { create(:admin) }


  # set headers for authorization
  let(:headers) { { 'Authorization' => token_generator(user.id) } }
  let(:invalid_headers) { { 'Authorization' => nil } }

  describe '#authorize_request' do
    context 'When auth token is passed' do
      before { allow(request).to receive(:headers).and_return(headers) }

      # private method authorize_request returns current user
      it 'sets the current user' do
        expect(subject.instance_eval { authorize_request }).to eq(user)
      end

      it 'checks if user is an admin' do
        expect(subject.instance_eval { authorize_request}.is_admin?).to be_truthy
      end
    end

    context 'When auth token is not passed' do
      before do
        allow(request).to receive(:headers).and_return(invalid_headers)
      end

      it 'raises MissingToken error' do
        expect { subject.instance_eval { authorize_request } }.to raise_error(ExceptionHandler::MissingToken, /Missing token/)
      end
    end
  end
end