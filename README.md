## Concept

With the app you can join rooms with other users and play a guessing game. The users see a picture/clip from a game and the users have to guess the name of the game. The user that guess first will be the king of the room (a king of the hill idea). The game is over al with the user guessed the most games. 

## DLC

![Untitled Diagram (1)](https://user-images.githubusercontent.com/43183768/79788600-34ce2d80-8349-11ea-9ce6-5ff8feea122f.jpg)


## Install 

```
# Clone repository
git clone https://github.com/YOUR-USERNAME/real-time-web-1920.git

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

RAWG have alot information about games. it is also free no key required. 

* Ratelimit: Unknown
* 




## To do List
- [x] Build the Chat function
- [x] Build Rooms function
- [x] Connect with a API (Gaming)
- [x] Start the game if there are 4 people 
- [x] Render the image if there are 4 people joined
- [x] Allow user the typ the name of the game and check if it is correct
- [ ] If correct answer fetch a new img and the name for the user to guess.
- [ ] Add scores for the users if correct
- [ ] After 10 img the game is over 
- [ ] Show the winner if the game is over (high score)
- [ ] Updating Styling

## wishlist

- [ ] track how much rooms are created and connected (show it in a chart)
- [ ] add DB (to save the rooms if the game is not over)
