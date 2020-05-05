# Real-Time Web 1920

During this course you will learn how to build a meaningful real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

## Concept: Game of Trivia

<img width="" alt="game-trivia" src="https://user-images.githubusercontent.com/43183768/81063236-bbe9dc80-8ed7-11ea-8d39-0aecdd8bd2a2.png">


With Game of Trivia yuo can test your game knowledge with other users and determine who is the king of games. The users see a (picture/clip/info) from a game and  have to guess the name of the game. iF you guess first you will get a point and a new ronde will start. after 10 rondes the game is over and the user with the most points win. 


### Features

* Make/Join a Room
* Ronde based
* Chat function
* You can typ commands.
* You get points if you guess it first
* Game over screen with the winner of the game.

#### Commands
* /help : explain how the game works
* /room : Show Room Name
* /marco : polo
* /hint : give a hint (not working now)

## DLC

![DLC](https://user-images.githubusercontent.com/43183768/81080010-90bfb700-8ef0-11ea-8d9d-7f906e3e16d6.png)

## Events

* ``` new-user ``` : You have joined message (other users will not see this message) 
* ``` room-created ``` : Creates a new room
* ``` user-connected ```: a user has joined a room 
* ``` ronde-message ```:  broadcast message which round the game is
* ``` send-chat-message ``` triggers from input chat
* ``` correct-message ``` message that you have the correct answer
* ``` update-score ``` Add a point to the user, message is send to broadcast
* ``` chat-message ``` message is send to broadcast
* ``` user-disconnected ``` user has leaved the room
* ``` newImage ``` add new image
* ``` game-over ``` The game is over and the room wil be deleted


## Install 

```
# Clone repository
git clone https://github.com/TheKevSter35/real-time-web-1920.git

cd real-time-web-1920

# Install dependencies
npm install

# Start liveserver
npm run dev
```

## Dependencies 

```
"body-parser": "^1.19.0",
"ejs": "^3.0.2",
"express": "^4.17.1",
"node-fetch": "^2.6.0",
"nodemon": "^2.0.2",
"socket.io": "^2.3.0"
```


## API

### RAWG 

This is a huge database with information about games and everything relevant. 

* Ratelimit: Unknown
* KEY: no key required

https://rawg.io/


## To do List
- [x] Build the Chat function
- [x] Build Rooms function
- [x] Connect with a API (Gaming)
- [x] Start the game if there are 4 people 
- [x] Render the image if there are 4 people joined
- [x] Allow user the typ the name of the game and check if it is correct
- [x] If correct answer fetch a new img and the name for the user to guess.
- [x] Add scores for the users if correct
- [x] Issue that the user can't scroll if there are a lot of messages.
- [x] Add rondes 
- [x] Add game over screen
- [x] After 10 (rondes) the game is over 
- [ ] Show the winner if the game is over (high score)
- [ ] Updating Styling
- [ ] Show gameplay footage from the game
- [ ] Show all users in room with there name and score. 
- [ ] /hint will give the user a hint to guess the game name (but it will cost 0.5 points)

## backlog

- [x] Delete room if game is over
- [x] Only delete the room were the game is over
- [ ] if correct fetch only in the room not all rooms if multiple games are started
- [ ] if correct add 1 ronde only in the room not all rooms
- [ ] Fix that the same gameName isnt asked again (fetch). 

## wishlist

- [ ] track how much rooms are created and connected (show it in a chart)
- [ ] add DB (to save the rooms if the game is not over)
- [ ] Add variantes for the users to guess (Name of character, name of publisher )

