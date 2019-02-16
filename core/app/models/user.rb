class User < ApplicationRecord
  has_one :admin
  # encrypt_password
  has_secure_password

  # Validations
  validates_presence_of :first_name, :email, :password_digest

  def is_admin?
    admin != nil
  end
end
