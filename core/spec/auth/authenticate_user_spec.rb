require 'rails_helper'

RSpec.describe AuthenticateUser do
  # create test user
  let(:user) { create(:user) }

  # valid request object
  subject(:valid_auth_obj) { described_class.new(user.email, user.password) }

  # invalid request object
  subject(:invalid_request_obj) { described_class.new('foo', 'bar') }

  # test suite for AuthenticateUser#call
  describe  '#call' do
    # return token when valid request
    context 'when credentials are valid' do
      it 'returns an auth token' do
        token = valid_auth_obj.call
        expect(token).not_to be_nil
      end
    end

    # raise Authentication Error when invalid request
    context 'when credentials are invalid' do
      it 'raises an authentication error' do
        expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::AuthenticationError, /Invalid credentials/)
      end
    end
  end
end