Rails.application.routes.draw do

  devise_for :users
  
  get 'rooms/show'
  root 'welcome#index'
  get 'backbone' => 'backbone#index'

  mount ActionCable.server => '/cable'
  
  
end
