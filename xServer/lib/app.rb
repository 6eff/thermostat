require 'sinatra/base'
require 'json'
require_relative 'data_mapper_setup'

class XServer < Sinatra::Base
  set :public_folder, proc { File.join(root) }

  before do
      headers 'Access-Control-Allow-Origin' => '*'
  end

  post '/send' do
    thermostat_temp = params[:temp]
    psm = params[:psm]
    if ReceiverAPI.first
      ReceiverAPI.update(thermostat_temp: thermostat_temp, psm: psm)
    else
      ReceiverAPI.create(thermostat_temp: thermostat_temp, psm: psm)
    end
  end

  get '/send' do
    response = ReceiverAPI.last
    { thermostat_temp: response.thermostat_temp.to_s, psm: response.psm }.to_json
  end

  run! if app_file == $PROGRAM_NAME
end
