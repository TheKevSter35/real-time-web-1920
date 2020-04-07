let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let app = express()
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let port = process.env.PORT || 3000



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
let rooms = { name: {}}
let users = {}


app.get('/', (req, res) => {
    res.render('index', {
      rooms: rooms
    })
    // res.sendFile(__dirname + '/index.html');
  })


  app.post('/room', (req, res) => {
    if (rooms[req.body.room] != null){
      return  res.redirect('/')
    }
      rooms[req.body.room] = {users: {}}
      res.redirect(req.body.room)
      // send message that new room was created
      io.emit('room-created', req.body.room)
    })


  
app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null){
    return  res.redirect('/')
  }
  res.render('room', {
    roomName: req.params.room
  })
  // res.sendFile(__dirname + '/index.html');
})

  io.on('connection', function(socket){
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected' , name)
      })
    socket.on('send-chat-message' , message => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    })
  
    socket.on('disconnect', function(){
      socket.broadcast.emit('user-disconnected', users[socket.id] );
      delete users[socket.id]
        })
  });


  
http.listen(port, () => console.log(`Example app listening on port ${port}!`))