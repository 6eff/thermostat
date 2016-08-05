require 'data_mapper'
require 'dm-postgres-adapter'

require_relative 'models/receiverAPI'

ENV['RACK_ENV'] ||= 'development'
DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/thermostatapi_#{ENV['RACK_ENV']}")
DataMapper.finalize
DataMapper.auto_upgrade!
