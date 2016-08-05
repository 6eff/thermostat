class ReceiverAPI

  include DataMapper::Resource

  property :id, Serial
  property :thermostat_temp, Integer
  property :psm, String

end
