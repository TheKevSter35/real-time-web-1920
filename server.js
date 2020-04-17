let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let app = express()
let fetch = require('node-fetch');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 5000



//view Engines 
app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set Static path for non html code like pictures and CSS
app.use(express.static(path.join(__dirname + 'public')))
let rooms = {}


app.get('/', (req, res) => {
  res.render('index', {
    rooms: rooms
  })
})


app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = {
    users: {}
  }
  res.redirect(req.body.room)
  // send message that new room was created
  io.emit('room-created', req.body.room)
})



app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }


  fetch(`https://api.rawg.io/api/games`)
    .then(async response => {
      const GamesData = await response.json()
      let randomItem = GamesData.results[Math.random() * GamesData.results.length | 0];

      res.render('room', {
        roomName: req.params.room,
        randomGames: randomItem,
        GamesData,

      })
      // res.sendFile(__dirname + '/index.html');
    })


})
let gameName = '';
io.on('connection', function (socket) {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })

  fetch(`https://api.rawg.io/api/games`)
    .then(async response => {
      const GamesData = await response.json()
      let randomItem = GamesData.results[Math.random() * GamesData.results.length | 0];

      socket.emit('message', );
      gameName = randomItem.name;
      console.log('2e = ' + gameName);

    })

  socket.on('send-chat-message', (room, message) => {
    if (message == gameName) {
      socket.to(room).broadcast.emit('correct-message', {
        message: message,
        name: rooms[room].users[socket.id]
      })
      console.log("CORRECT");

      
    } else {
      socket.to(room).broadcast.emit('correct-message', {
        message: message,
        name: rooms[room].users[socket.id]
      })
    }
    // socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id], randomGames: randomItem })
  })


  socket.on('disconnect', function () {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}


http.listen(port, () => console.log(`Example app listening on port ${port}!`))