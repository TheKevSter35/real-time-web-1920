export async function  GetAPI (){
    fetch(`https://api.rawg.io/api/games`)
    .then(async response => {
      const GamesData = await response.json()
      let randomItem = GamesData.results[Math.random() * GamesData.results.length | 0];
      const gameImg = randomItem.background_image ;
      const gameName = randomItem.name ;
      
      console.log('2e = ' + gameName);
      console.log('3e = ' + gameImg);
      io.in(room).emit('newImage', {gameImg});
    })
   }