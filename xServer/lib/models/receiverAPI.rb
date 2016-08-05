class ReceiverAPI

  include DataMapper::Resource

  property :id, Serial
  property :themostat_temp, Integer
  property :psm, String

end
