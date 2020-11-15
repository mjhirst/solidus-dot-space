class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'room_channel_1'
    puts('subscribed to channel')
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    puts(data['message'])
    Message.create!
    ActionCable.server.broadcast 'room_channel_1', message: data['message']
  end
  
end
