(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const movieSearchInput = document.getElementById("movieSearch");
      const datalist = document.getElementById("movieSuggestions");
      let timer;
      const API_KEY = "a07cd8b6";
  
      movieSearchInput.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const query = movieSearchInput.value;
          if (query.length < 3) return; 
          fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
              datalist.innerHTML = "";
              if (data && data.Search) {
                data.Search.forEach(movie => {
                  const option = document.createElement("option");
                  option.value = movie.Title;
                  datalist.appendChild(option);
                });
              }
            })
            .catch(error => console.error("Error fetching movies:", error));
        }, 500);
      });
    });
  })();
  