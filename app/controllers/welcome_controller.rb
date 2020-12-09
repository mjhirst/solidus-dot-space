class WelcomeController < ApplicationController
	
	def index
		
	end
	
	def backbone
		@messages = Message.all
	end
	
end
