(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const reviewId = params.get("id");
  
      if (!reviewId) {
        document.getElementById("reviewTitle").textContent = "No Review ID Provided";
        document.getElementById("reviewContent").textContent = "";
        document.getElementById("reviewRating").textContent = "";
        document.getElementById("reviewBy").textContent = "";
        document.getElementById("reviewTime").textContent = "";
        return;
      }
      
      fetch(`/post/${reviewId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          if (data.post) {
            document.getElementById("reviewTitle").textContent = data.post.Topic || "No Title";
            document.getElementById("reviewContent").textContent = data.post.Message || "No Content";
            document.getElementById("reviewRating").textContent = `Rating: ${data.post.Rating || "N/A"}`;
            document.getElementById("reviewBy").textContent = `Created by: ${data.post.By || "Unknown"}`;
            document.getElementById("reviewTime").textContent = `Created at: ${data.post.At || "Unknown"}`;
          } else {
            document.getElementById("reviewTitle").textContent = "Review Not Found";
            document.getElementById("reviewContent").textContent = "";
            document.getElementById("reviewRating").textContent = "";
            document.getElementById("reviewBy").textContent = "";
            document.getElementById("reviewTime").textContent = "";
          }
        })
        .catch(error => {
          console.error("Error fetching review details:", error);
          document.getElementById("reviewTitle").textContent = "Error loading review";
          document.getElementById("reviewContent").textContent = "";
          document.getElementById("reviewRating").textContent = "";
          document.getElementById("reviewBy").textContent = "";
          document.getElementById("reviewTime").textContent = "";
        });
    });
  })();
  