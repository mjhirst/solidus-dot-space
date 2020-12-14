jQuery(document).ready ->
  messages = $('#messages')
  room = messages.data('1')

  App.room = App.cable.subscriptions.create { 
      channel: "RoomChannel"
      room: "1"
  },

  connected: ->
    console.log('Connected to RoomChannel')
# Called when the subscription is ready for use on the server

  disconnected: ->
    console.log('Disconnected from RoomChannel')
# Called when the subscription has been terminated by the server

  received: (data) ->
    x = data['message'].split(' ')
    dimx = x[2].replace('x:', '')
    dimy = x[3].replace('y:', '')
    $('#mouseX').html(dimx)
    $('#mouseY').html(dimy)
    # console.log("X", dimx, "Y", dimy);
    
    if (typeof cube != "undefined")
      cube.rotation.x = dimx / 100
      cube.rotation.y = -dimy / 100
      cubeRenderer.render(cubeScene, cubeCamera)
      $('#messages').append('<div>' + data['message'] + '</div>')

  speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
  if event.keyCode is 13 # return = send
    console.log(event.target.value)
    App.room.speak(event.target.value)
    event.target.value = ''
    event.preventDefault()
