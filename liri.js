require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var spotifyRequire = require("node-spotify-api");
var moment = require("moment");

var spotifyInfo = new spotifyRequire(keys.spotify);

var appSelect = process.argv[2];
var termSelect = process.argv.slice(3).join(' ');


//switch statement to determing which api to utilize, depending on user input!

function inputs (appSelect, termSelect){
switch (appSelect) {
    case "bands-in-town":
      myBands(termSelect);
      break;
    case "spotify-this-song":
      mySpotify(termSelect);
      break;
    case "movie-this":
      myMovie(termSelect);
      break;
    case "do-what-it-says":
      myDo();
      break;
    default:
    console.log("Please select an action request listed below:");
    console.log("bands-in-town, spotify-this-song, movie-this");
      break;
  }
};

inputs(appSelect, termSelect);

  
  
  //bands-in-town api call



function myBands(termSelect){
      axios.get("https://rest.bandsintown.com/artists/" + termSelect + "/events?app_id=codingbootcamp").then(function(response){

    console.log(appSelect);
    console.log(termSelect);
    console.log("Venue: " + response.data[1].venue.name);
    console.log("Location: " + response.data[1].venue.city);
    

    console.log("Date: " + moment(response.data[1].datetime).format("MM-DD-YYYY"));
    
});
}

//spotify api

  function mySpotify(termSelect) {
      console.log(termSelect);
    spotifyInfo.search({type: 'track', query: termSelect, limit: '1'},function(err,data) {
          if (err) {
              console.log('Error: ' + err);
          }
          else {
              console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
              console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n");
              console.log("Album " + JSON.stringify(data.tracks.items[0].album.name) + "\n");
              console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
          }
        
        
          
      })
    
    };


//OMDB api


  function myMovie(termSelect) {
      

      if(termSelect != undefined){
        axios.get("http://www.omdbapi.com/?t=" + termSelect + "&apikey=853e1bbe").then(function(response){
      
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Imdb Rating: " +response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Langauge: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors/Actresses: " + response.data.Actors);


      
    })
  }
  else {
    termSelect = "Mr.Nobody";
    axios.get("http://www.omdbapi.com/?t=" + termSelect + "&apikey=853e1bbe").then(function(response){
      
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Imdb Rating: " +response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Langauge: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors/Actresses: " + response.data.Actors);

  })
  }
  };

  function myDo() {
    fs.readFile("./random.txt", function(err, data) {
      

      var str = data.toString();
      var splitString1 = str.slice(0,17);
      var splitString2 = str.slice(18,36);
      
      appSelect = splitString1;
      termSelect = splitString2;
      console.log(appSelect);
      console.log(termSelect);

      inputs(appSelect,termSelect);


    })
  };
