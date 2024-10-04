let input = document.getElementById("Movie");
let button = document.getElementById("btn");
let show = document.getElementById("result");
let image = document.getElementById("image");

button.addEventListener("click", () => {
  let movieTitle = input.value.trim(); // trim spaces to avoid errors

  if (movieTitle === "") {
    show.innerHTML = "Please enter a movie title.";
    return;
  }

  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=8bf974f8`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === "False") {
        show.innerHTML = `Error: ${data.Error}`; // shows error like "Movie not found!"
      } else {
        show.innerHTML = `Movie Name: ${data.Title} <br> 
          Released: ${data.Released} <br> 
          Director: ${data.Director} <br> 
          Writer: ${data.Writer} <br> 
          Actors: ${data.Actors}`;
        image.src = data.Poster !== "N/A" ? data.Poster : "default-poster.jpg"; // fallback image if no poster is available
      }
    })
    .catch((error) => {
      show.innerHTML = `Error: ${error.message}`;
    });
});
