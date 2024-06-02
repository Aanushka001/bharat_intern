const api = "api_key=429859c6eee2c5419cde9008a194d762";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];

        const banner = document.getElementById("banner");
        const banner_title = document.getElementById("banner_title");
        const banner_desc = document.getElementById("banner_description");

        banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
        banner_desc.innerText = truncate(setMovie.overview, 150);
        banner_title.innerText = setMovie.name || setMovie.title;
    });

function createRow(title, fetchUrl) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");

            row.className = "row";

            const rowTitle = document.createElement("h2");
            rowTitle.className = "row_title";
            rowTitle.innerText = title;

            row.appendChild(rowTitle);

            const row_posters = document.createElement("div");
            row_posters.className = "row_posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row_poster";
                poster.src = `${img_url}${movie.poster_path}`;
                poster.alt = movie.name || movie.title;

                row_posters.appendChild(poster);
            });

            headrow.appendChild(row);
        });
}

createRow("Trending Now", requests.fetchTrending);
createRow("Netflix Originals", requests.fetchNetflixOriginals);
createRow("Action Movies", requests.fetchActionMovies);
createRow("Comedy Movies", requests.fetchComedyMovies);
createRow("Horror Movies", requests.fetchHorrorMovies);
createRow("Romance Movies", requests.fetchRomanceMovies);
createRow("Documentaries", requests.fetchDocumentaries);

window.addEventListener("scroll", function() {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("active", window.scrollY > 0);
});
