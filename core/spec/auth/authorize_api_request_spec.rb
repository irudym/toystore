require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  # create a test user
  let(:user) { create(:user) }

  # mock authorization header
  let(:header) { { 'Authorization' => token_generator(user.id) } }

  # invalid request subject
  subject(:invalid_request_obj) { described_class.new({}) }

  # valid request subject
  subject( :request_obj) { described_class.new(header) }

  # test suite for AuthorizeApiRequest#call
  # this is our enr point into the service class
  describe '#call' do
    # returns user object when request is valid
    context 'when request is valid' do
      it 'returns user object' do
        result = request_obj.call
        expect(result[:user]).to eq(user)
      end
    end

    # returns error message when the request is invalid
    context 'when request is invalid' do
      context 'when the token is missed' do
        it 'raises MissingToken error' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::MissingToken, 'Missing token')
        end
      end

      context 'when the token is invalid' do
        subject(:invalid_request_obj) do
          # custom helper method 'token generator'
          described_class.new('Authorization' => token_generator(5))
        end

        it 'raises InvalidToken error' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
        end
      end

      context 'when token is expired' do
        let(:header) { { 'Authorization' => expired_token_generator(user.id) } }
        subject(:request_obj) { described_class.new(header) }

        it 'raises ExpiredSignature error' do
          expect { request_obj.call }.to raise_error(ExceptionHandler::InvalidToken, /Signature has expired/)
        end
      end

      context 'fake token' do
        let(:header) { { 'Authorization' => 'foobar' } }
        subject(:invalid_request_obj) { described_class.new(header) }

        it 'handles JWT::DecodeError' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::InvalidToken, /Not enough or too many segments/)
        end
      end
    end
  end
end