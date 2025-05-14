class UsersController < ApplicationController
  before_action :authorize, only: [:me]
  before_action :set_user, only: [ :show, :update, :destroy]
  skip_before_action :authorize, only: :create


  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  def me
    if @current_user
      render json: @current_user
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.new(user_params)
    if user.save
      token = JWT.encode({ user_id: user.id }, Rails.application.secret_key_base)
    render json: { user: user, token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
   # Only allow a list of trusted parameters through.
def user_params
  params.permit(:username, :email, :password, :password_confirmation)
end
end
