class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  # called before every action on controllers
  before_action :authorize_request
  attr_reader :current_user


  def authenticate_admin
    unless @current_user.is_admin?
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end

  private

  # check for valid request token and return user
  def authorize_request
    @current_user = nil
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
