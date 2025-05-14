class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      # Generate JWT token
      # token = JWT.encode({user_id: user.id}, Rails.application.secret_key_base)
      payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.secret_key_base)

      # Return user and token
      render json: { user: user, token: token }
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def destroy
    # No server-side action needed for logout with JWT
    # Client will simply discard the token
    head :no_content
  end
end
