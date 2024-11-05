const input = document.getElementById("Movie");
const button = document.getElementById("btn");
const show = document.getElementById("result");
const image = document.getElementById("image");

button.addEventListener("click", async () => {
  const movieTitle = input.value.trim();

  if (!movieTitle) {
    show.innerHTML = "Please enter a movie title.";
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=8bf974f8`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await response.json();

    if (data.Response === "False") {
      show.innerHTML = `Error: ${data.Error}`;
    } else {
      show.innerHTML = `
        <strong>Movie Name:</strong> ${data.Title} <br>
        <strong>Released:</strong> ${data.Released} <br>
        <strong>Director:</strong> ${data.Director} <br>
        <strong>Writer:</strong> ${data.Writer} <br>
        <strong>Actors:</strong> ${data.Actors}
      `;
      image.src = data.Poster !== "N/A" ? data.Poster : "default-poster.jpg";
    }
  } catch (error) {
    show.innerHTML = `Error: ${error.message}`;
  }
});
