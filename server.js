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
  res.render('room', {
    roomName: req.params.room,

  })
  // res.sendFile(__dirname + '/index.html');
})


let gameName = '';

let ronde = [1];
io.on('connection', function (socket) {


  socket.on('new-user', (room, name) => {
    async function randomGame() {
      fetch(`https://api.rawg.io/api/games`)
        .then(async response => {
          const GamesData = await response.json()
          let randomItem = GamesData.results[Math.random() * GamesData.results.length | 0];
          const gameImg = randomItem.background_image;
          gameName = randomItem.name;
          console.log('Name = ' + gameName);
          console.log('Img = ' + gameImg);
          io.in(room).emit('newImage', {
            gameImg
          });
        })
    }
    socket.join(room)

    console.log('Room: ' + [room] + " have " + io.sockets.adapter.rooms[room].length + " players");
    if (io.sockets.adapter.rooms[room].length == 2) {
      console.log('READY')
      randomGame()
      io.in(room).emit('ronde-message', { ronde: ronde })
      rooms[room].users[socket.id] = name
      socket.to(room).broadcast.emit('user-connected', name)
    }
  })


  socket.on('send-chat-message', (room, message) => {

    if (message == gameName) {
      console.log("CORRECT");
  
      if(ronde == 3){
        console.log("GAME OVER");
        io.in(room).emit('game-over')
      }
      else{
      
      io.in(room).emit('correct-message',
      fetch(`https://api.rawg.io/api/games`)
      .then(async response => {
        const GamesData = await response.json()
        let randomItem = GamesData.results[Math.random() * GamesData.results.length | 0];
        const gameImg = randomItem.background_image;
        gameName = randomItem.name;
        console.log('Name = ' + gameName);
        console.log('IMG = ' + gameImg);
        console.log('ronde = ' + ronde);
        io.in(room).emit('newImage', {
          gameImg
        });
      }),
     {
        message: message,
        name: rooms[room].users[socket.id]
        
        
      })
      io.in(room).emit('ronde-message',  {
        ronde: [ronde++] , ronde
      })
    }
    } else {
      socket.to(room).broadcast.emit('chat-message', {
        message: message,
        name: rooms[room].users[socket.id]

      })
    }
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