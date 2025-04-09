(() => {
  document.addEventListener("DOMContentLoaded", function() {
    fetch('/posts')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("reviewsListContainer");
        if (!data || data.length === 0) {
          container.innerHTML = '<div class="alert alert-info" role="alert">No reviews available.</div>';
        } else {
          let html = '<div class="list-group">';
          data.forEach(post => {
            //  post's _id as its unique identifier
            const postId = post._id ? post._id : '';
            html += `
              <a href="review.html?id=${postId}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span>${post.Topic} - Rating: ${post.Rating}</span>
                <button class="btn btn-sm btn-outline-primary">View Details</button>
              </a>
            `;
          });
          html += '</div>';
          container.innerHTML = html;
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        document.getElementById("reviewsListContainer").innerHTML = '<div class="alert alert-danger" role="alert">Error loading reviews.</div>';
      });
  });
})();
