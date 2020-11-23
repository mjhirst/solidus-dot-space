connections = []

addConnection = (id) ->
  connections.push(id)

removeConnection = (id) ->
  index = connections.indexOf(id)
  connections.splice(index, 1) if index > -1

connectedTo = (id) ->
  connections.indexOf(id) > -1

jQuery(document).on 'turbolinks:load', ->
  messages = $('#messages')
  room = messages.data('1')

  if $('#messages').length > 0 && !connectedTo(room)
    App.room = App.cable.subscriptions.create { 
      channel: "RoomChannel"
      room: "1"
    },

    connected: ->
      console.log('Connected to RoomChannel')
      addConnection(room)
# Called when the subscription is ready for use on the server

    disconnected: ->
      console.log('Disconnected from RoomChannel')
      removeConnection(room)
# Called when the subscription has been terminated by the server

    received: (data) ->
      # console.log(data['message'])
      $('#messages').append('<div>' + data['message'] + '</div>')
      x = data['message'].split(' ')
      dimx = x[2].replace('x:', '')
      dimy = x[3].replace('y:', '')
      console.log(dimx, dimy)
      $('#mouseX').html(dimx)
      $('#mouseY').html(dimy)
      cube.rotation.x = dimx / 100
      cube.rotation.y = -dimy / 100
      renderer.render(scene, camera)

    speak: (message) ->
      @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
  if event.keyCode is 13 # return = send
    console.log(event.target.value)
    App.room.speak(event.target.value)
    event.target.value = ''
    event.preventDefault()
