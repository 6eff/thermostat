require 'sinatra/base'
require 'json'
require_relative 'data_mapper_setup'

class XServer < Sinatra::Base

  set :public_folder, proc { File.join(root)}

  before do
      headers "Access-Control-Allow-Origin" => "*"
    end

  post '/send' do
    ReceiverAPI.create(thermostat_temp: params[:temp],
                       psm: params[:psm])
  end

  get '/send' do
    { time: Time.now.to_s }.to_json
  end

  run! if app_file == $0

end
