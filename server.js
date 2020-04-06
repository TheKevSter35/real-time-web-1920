let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let app = express()
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let port = process.env.PORT || 5000
let users = {}
//view Engines 
app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set Static path for non html code like pictures and CSS
app.use(express.static(path.join(__dirname + 'public')))


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
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