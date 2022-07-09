import "./Films.css"
import { useRef, useState } from "react";

export default function Films() {
    const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const SEARCHAPI =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const main = useRef(null);
    const form = useRef(null);
    const search = useRef(null);


    getMovies(APIURL);

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();

        console.log(respData);

        showMovies(respData.results);
    }

    function showMovies(movies) {
       
        movies.forEach((movie) => {
            const { poster_path, title, vote_average, overview } = movie;

            const movieEl = document.createElement("div");
            movieEl.classList.add("movie");

            movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                vote_average
            )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

            main.appendChild(movieEl);
        });
    }

    function getClassByRate(vote) {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 5) {
            return "orange";
        } else {
            return "red";
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchTerm = search.value;

        if (searchTerm) {
            getMovies(SEARCHAPI + searchTerm);

            search.value = "";
        }
    });
    return(
        <div>
            <header>
                <form id="form" ref={form}>
                    <img className="image" width="100pxs"  src="https://static.miraheze.org/closinglogosgroupwiki/e/e1/GW266H196.jpeg.jpg?20211115093351" alt="logo"/>
                    <input 
                        ref={search}
                        type="text"
                        id="search"
                        placeholder="Search"
                        className="search"
                    />
                </form>
            </header>
            <main ref={main} id="main></main>
        </div>
    )
}
