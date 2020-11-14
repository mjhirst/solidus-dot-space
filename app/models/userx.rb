class User < ApplicationRecord
	include ActiveModel::SecurePassword
	
	validates :first_name, presence: true, length: { minimum: 3 }
	validates :last_name, presence: true, length: { minimum: 3 }
	before_validation :sanitiseEmail
	validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
	
	def sanitiseEmail
		self.email = self.email.downcase.strip
	end
	  
end
