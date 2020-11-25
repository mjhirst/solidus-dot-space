Rails.application.routes.draw do

  devise_for :users
  
  get 'rooms/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  mount ActionCable.server => '/cable'
  
  
end
