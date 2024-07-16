document.getElementById('search-btn').addEventListener('click', function() {
    let movieName = document.getElementById('movie-input').value;
    if (movieName) {
        getMovieData(movieName);
    } else {
        alert("Please enter a movie name");
    }
});

async function getMovieData(movieName) {
    try {
        let apiKey = '92618d1';
        let url = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;
        
        let response = await fetch(url);
        
        if (response.ok) {
            let data = await response.json();
            updateMovieInfo(data);
        } else {
            alert("Could not retrieve movie data. Please try again.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching the movie data. Please try again.");
    }
}

function updateMovieInfo(data) {
    let movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.innerHTML = '';

    if (data.Response === "True") {
        data.Search.forEach(movie => {
            let movieCard = `
                <div class="movie-card">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h2>${movie.Title}</h2>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Type:</strong> ${movie.Type}</p>
                </div>
            `;
            movieInfoDiv.innerHTML += movieCard;
        });
    } else {
        movieInfoDiv.innerHTML = `<p>Movie not found. Please try again.</p>`;
    }
}
