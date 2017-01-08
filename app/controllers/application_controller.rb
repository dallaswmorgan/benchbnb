class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    return false unless current_user
    true
  end

  def log_in(user)
    user.reset_session_token!
    @current_user = user
    session[:session_token] = user.session_token
  end

  def log_out
    @current_user = nil
    current_user.reset_session_token!
    session[:session_token] = nil
  end
end
