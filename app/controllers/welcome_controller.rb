class WelcomeController < ApplicationController
	
	def index
		@messages = Message.all
	end
	
end
