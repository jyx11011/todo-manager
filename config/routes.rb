Rails.application.routes.draw do
  get 'trash', to: 'deleted_tasks#index'
  post 'deleted_tasks/destroy/:id', to: 'deleted_tasks#destroy'
  post 'deleted_tasks/destroy'
  post 'deleted_tasks/recover/:id', to: 'deleted_tasks#recover'
  get 'tasks/filter'
  get 'tasks/index'

  resources :tasks, :tags

  root 'tasks#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
