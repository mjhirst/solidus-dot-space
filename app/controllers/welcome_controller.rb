class WelcomeController < ApplicationController
	
	def index
		@messages = Message.all
	end
	
	def landing
		
	end
	
end
