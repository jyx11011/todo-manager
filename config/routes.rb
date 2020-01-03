Rails.application.routes.draw do
  get 'sessions/new'
  post 'sessions', to: 'sessions#create'
  get 'sessions/logout'
  get 'sessions/:name', to: 'sessions#new'
  
  get 'trash', to: 'deleted_tasks#index'
  post 'deleted_tasks/destroy/:id', to: 'deleted_tasks#destroy'
  post 'deleted_tasks/destroy'
  post 'deleted_tasks/recover/:id', to: 'deleted_tasks#recover'
  
  get 'tasks/filter'
  get 'tasks', to: 'tasks#index'
  put 'tasks/:id', to: 'tasks#update'
  delete 'tasks/:id', to: 'tasks#destroy'
  post 'tasks', to: 'tasks#create'

  get 'tags', to: 'tags#index'
  put 'tags/:id', to: 'tags#update'
  delete 'tags/:id', to: 'tags#destroy'
  post 'tags', to: 'tags#create'

  resources :users do
    resources :tasks, :tags
  end

  root 'sessions#new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
