class BackboneController < ApplicationController
	
	def index
		@messages = Message.all
	end
	
end
