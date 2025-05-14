class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :authorize
  
  private
  
  def authorize
    auth_header = request.headers['Authorization']
    
    if auth_header
      token = auth_header.split(' ')[1]
      
      begin
        decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')
        @user_id = decoded_token[0]['user_id']
        @current_user = User.find_by(id: @user_id)
        
        render json: { errors: ["User not found"] }, status: :unauthorized unless @current_user
      rescue JWT::DecodeError
        render json: { errors: ["Invalid token"] }, status: :unauthorized
      end
    else
      render json: { errors: ["No token provided"] }, status: :unauthorized
    end
  end
  
  def current_user
    @current_user
  end
end
