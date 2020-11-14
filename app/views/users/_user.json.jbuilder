json.extract! user, :id, :email, :total_logins, :first_name, :last_name, :last_seen_at, :last_seen_ip, :created_at, :updated_at
json.url user_url(user, format: :json)
