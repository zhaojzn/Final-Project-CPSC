(() => {
  
    fetch('/userRole')
      .then(response => response.json())
      .then(data => {
        if (data.role !== 'member') {
          const newReviewTab = document.getElementById("new-review-tab");
          const newReviewContent = document.getElementById("new-review");
          if (newReviewTab) newReviewTab.style.display = "none";
          if (newReviewContent) newReviewContent.style.display = "none";
  
          const reviewListTab = document.getElementById("review-list-tab");
          reviewListTab.classList.add("active");
          const reviewListContent = document.getElementById("review-list");
          reviewListContent.classList.add("show", "active");
  
          const dashboardLink = document.querySelector('.dashboard-link');
          if (dashboardLink) dashboardLink.href = "/guest.html";
        }
      })
      .catch(error => console.error("Error fetching user role:", error));
  })();
  