(() => {
    fetch('/userRole')
      .then(response => response.json())
      .then(data => {
        if (data.role !== 'member') {
          window.location.href = '/index.html';
        }
      })
      .catch(error => {
        console.error("Error checking user role:", error);
        window.location.href = '/index.html';
      });
  })();
  