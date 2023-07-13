Rails.application.routes.draw do
  
  get  'about' => 'about_school#index'
  get 'contact/index'
  get 'dashboard/index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
  }

  #get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"

  
  resources :students
  resources :syllabuses
  resources :blogs
  resources :dashboards
  resources :blog_posts


  namespace :admin do
    resources :students
    resources :syllabuses
    resources :blogs
    resources :dashboards
    resources :blog_posts
  end

  #get '/dashboard' => 'dashboard#index', as: :dashboard

end
