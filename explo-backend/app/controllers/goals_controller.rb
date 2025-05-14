class GoalsController < ApplicationController
  before_action :authorize
  before_action :set_goal, only: [:show, :update, :destroy]

  # GET /goals
  def index
    @goals = @current_user.goals
    render json: @goals
  end

  # GET /goals/1
  def show
    render json: @goal
  end

  # POST /goals
  def create
    @goal = @current_user.goals.build(goal_params)
    if @goal.save
      render json: @goal, status: :created
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /goals/1
  def update
    if @goal.update(goal_params)
      render json: @goal
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goals/1
  def destroy
    @goal.destroy
    head :no_content
  end

  private

  def set_goal
    @goal = @current_user.goals.find_by(id: params[:id])
    render json: { errors: ["Goal not found"] }, status: :not_found unless @goal
  end

  def goal_params
    params.require(:goal).permit(:goalimage,:name,:saved_money,:total_money,:date, :members_count)
  end
end
