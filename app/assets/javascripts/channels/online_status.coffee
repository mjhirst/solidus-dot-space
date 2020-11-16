App.online_status = App.cable.subscriptions.create "OnlineStatusChannel",
connected: ->
  # Called when the subscription is ready for use on the server
  #update counter whenever a connection is established
  console.log('Connected to OnlineStatusChannel')
  App.online_status.update_counter()

disconnected: ->
  # Called when the subscription has been terminated by the server
  App.cable.subscriptions.remove(this)
  App.online_status.update_counter()
  console.log('Disconnected from OnlineStatusChannel')
  @perform 'unsubscribed'

received: (data) ->
  # Called when there's incoming data on the websocket for this channel
  val = data['counter'] #-1 since the user who calls this method is also counted, but we only want to count other users
  #update "_counter"-element in view:
  $('#clientsTag').html(val)
  console.log(data)

update_counter: ->
  @perform 'update_counter'
