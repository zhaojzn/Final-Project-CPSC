(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const carouselInner = document.querySelector("#topMoviesCarousel .carousel-inner");
      if (!carouselInner) return;
  
      fetch('/topMovies')
        .then(response => response.json())
        .then(movies => {
          if (!movies || movies.length === 0) {
            carouselInner.innerHTML = `
            <div class="carousel-item${activeClass}">
              <div class="text-center p-3" bg-dark color: white;">
                <h5>No Movies Found</h5>
              </div>
            </div>`;
            return;
          }
          let html = "";
          movies.forEach((movie, index) => {
            const activeClass = index === 0 ? " active" : "";
            html += `
            <div class="carousel-item${activeClass}">
              <div class="text-center p-3" bg-dark color: white;">
                <h5>${movie.Topic} - Rating: ${movie.Rating}</h5>
              </div>
            </div>`;
          });
          carouselInner.innerHTML = html;
        })
        .catch(error => {
          console.error("Error fetching top movies:", error);
          carouselInner.innerHTML = `
            <div class="carousel-item${activeClass}">
              <div class="text-center p-3" bg-dark color: white;">
                <h5>Error Loading Movies</h5>
              </div>
            </div>`;
        });
    });
  })();
  