class DashboardsController < ApplicationController
  def index
    @user = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end
