(() => {
    document.addEventListener("DOMContentLoaded", () => {
      fetch('/posts')
        .then(response => response.json())
        .then(posts => {
          const container = document.getElementById("adminPostsContainer");
          if (!posts || posts.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No posts available.</div>';
            return;
          }
          let html = '<table class="table table-striped">';
          html += '<thead><tr><th>Title</th><th>Rating</th><th>By</th><th>Action</th></tr></thead><tbody>';
          posts.forEach(post => {
            const postId = post._id ? post._id : '';
            html += `
              <tr data-postid="${postId}">
                <td>${post.Topic}</td>
                <td>${post.Rating}</td>
                <td>${post.By}</td>
                <td><button class="btn btn-danger btn-sm delete-post">Delete</button></td>
              </tr>
            `;
          });
          html += '</tbody></table>';
          container.innerHTML = html;
    
          document.querySelectorAll('.delete-post').forEach(button => {
            button.addEventListener('click', (e) => {
              const row = e.target.closest('tr');
              const postId = row.getAttribute('data-postid');
              fetch(`/posts/${postId}`, {
                method: 'DELETE'
              })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  row.remove();
                  alert("Post deleted successfully");
                } else {
                  alert("Failed to delete post");
                }
              })
              .catch(error => {
                console.error("Error deleting post:", error);
                alert("Error deleting post");
              });
            });
          });
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
          document.getElementById("adminPostsContainer").innerHTML = '<div class="alert alert-danger">Error loading posts.</div>';
        });
    });
  })();
  