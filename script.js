const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("#main")
const form = document.querySelector("#form")
const search=document.querySelector("#search")


// FAVORİ FİLMLER

getMovies(APIURL)

async function  getMovies(url) {

    const resp=await fetch(url)
    const respData = await resp.json()


    showMovies(respData.results)
    

}

function showMovies(movies) {

    //clear main
    main.innerHTML="";

    movies.forEach(movie =>{
        const MovieEl=document.createElement("div")
        MovieEl.classList.add("movie")

        if(movie.poster_path===null) {
            return;
        }

        MovieEl.innerHTML=`
        <div class="movie">
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class=${getClassByRate(Math.round(movie.vote_average))}>${Math.round(movie.vote_average)}</span>
            </div>
        </div>
        <div class="overview">
        <h3>Önizleme</h3>
        ${movie.overview}
        </div>
        `
        main.appendChild(MovieEl)

    })
}


function getClassByRate(vote) {

    if(vote >= 7) {
        return "green"
    } else if (vote => 5) {
        return "orange"        
    } else {
        return "red"
    }
}


form.addEventListener("submit", (e) => {

    e.preventDefault()

    const searchTerm=search.value

    if(searchTerm){

        getMovies(SEARCHAPI + searchTerm)

        
        search.value=""

    }
})

