App.room = App.cable.subscriptions.create { channel: "RoomChannel", room: "1"},

connected: ->
  console.log('connected')
# Called when the subscription is ready for use on the server

disconnected: ->
  console.log('disconnected')
# Called when the subscription has been terminated by the server

received: (data) ->
  console.log(data['message'])
  $('#messages').append("<div>" + data['message'] + "</div>")

speak: (message) ->
  @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
  if event.keyCode is 13 # return = send
    console.log(event.target.value)
    App.room.speak(event.target.value)
    event.target.value = ''
    event.preventDefault()
