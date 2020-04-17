export function api () {

    let url = "https://api.rawg.io/api/games"
    
    return fetch(url)
    .then(response => response.json())
    .then(data =>  clean(data.data))
    .then(data =>  store(data))
    console.log(url)
    .catch(err => {
      console.log(err);
    });
    
  }
  