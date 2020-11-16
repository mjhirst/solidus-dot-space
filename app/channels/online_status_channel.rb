class OnlineStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'online_status_channel'
    puts("HERE3")
    puts(ActionCable.server.connections.length)
    ActionCable.server.broadcast 'online_status_channel', counter: ActionCable.server.connections.length
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    #update counter whenever a connection closes
    puts("HERE2")
    puts(ActionCable.server.connections.length)
    ActionCable.server.broadcast 'online_status_channel', counter: ActionCable.server.connections.length
  end

  def update_counter
    puts("HERE1")
    puts(ActionCable.server.connections.length)
    ActionCable.server.broadcast 'online_status_channel', counter: ActionCable.server.connections.length
  end

  #Counts all users connected to the ActionCable server
  def count_unique_connections
    connected_users = []
    ActionCable.server.connections.each do |connection|
      connected_users.push(connection.current_user.id)
    end
    return connected_users.uniq.length
  end
end
