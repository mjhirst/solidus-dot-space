class ApplicationController < ActionController::Base
	
	#helper_method :current_user 
	#  def current_user 
	#	@current_user ||= User.find(session[:id]) if session[:id] 
	#  end
	#  
	#  def require_user 
	#	redirect_to '/login' unless current_user 
	#  end
	#  
	#  def require_admin
	#	redirect_to '/' unless current_user.try(:is_admin)
	#  end
	  
	  helper_method :current_user
	  def current_user
	  if session[:user_id]
		@current_user ||= User.find(session[:user_id])
	  else
		@current_user = nil
	  end
	end
	  
end
