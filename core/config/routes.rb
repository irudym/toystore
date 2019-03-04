Rails.application.routes.draw do

  scope module: :v1 do
    get 'types/pages/:id' => 'types#pages', defaults: { format: :json }
    get 'types/trash' => 'types#trash', defaults: { format: :json }
    get 'types/info' => 'types#info', defaults: { format: :json }
    put 'types/trash/:id', to: 'types#restore', defaults: { format: :json }
    resources :types, defaults: { format: :json }

    get 'categories/pages/:id' => 'categories#pages', defaults: { format: :json }
    get 'categories/trash' => 'categories#trash', defaults: { format: :json }
    get 'categories/info' => 'categories#info', defaults: { format: :json }
    put 'categories/trash/:id', to: 'categories#restore', defaults: { format: :json }
    resources :categories, defaults: { format: :json }

    get 'colours/pages/:id' => 'colours#pages', defaults: { format: :json }
    get 'colours/trash' => 'colours#trash', defaults: { format: :json }
    get 'colours/info' => 'colours#info', defaults: { format: :json }
    put 'colours/trash/:id', to: 'colours#restore', defaults: { format: :json }
    resources :colours, defaults: { format: :json }

    get 'materials/pages/:id' => 'materials#pages', defaults: { format: :json }
    get 'materials/trash' => 'materials#trash', defaults: { format: :json }
    get 'materials/info' => 'materials#info', defaults: { format: :json }
    put 'materials/trash/:id', to: 'materials#restore', defaults: { format: :json }
    resources :materials, defaults: { format: :json }

    get 'brands/pages/:id' => 'brands#pages', defaults: { format: :json }
    get 'brands/trash' => 'brands#trash', defaults: { format: :json }
    get 'brands/info' => 'brands#info', defaults: { format: :json }
    put 'brands/trash/:id', to: 'brands#restore', defaults: { format: :json }
    resources :brands, defaults: { format: :json }

    resources :products, defaults: { format: :json}
  end

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
