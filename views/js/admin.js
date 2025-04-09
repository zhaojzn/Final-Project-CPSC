(() => {
    document.addEventListener('DOMContentLoaded', () => {
      fetch('/users')
        .then(response => response.json())
        .then(users => {
          const container = document.getElementById('usersContainer');
          if (users.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No users found.</div>';
            return;
          }
          
          let html = '<table class="table table-striped">';
          html += '<thead><tr><th>Email</th><th>Current Role</th><th>Change Role</th><th>Action</th></tr></thead><tbody>';
          users.forEach(user => {
            html += `<tr data-userid="${user._id}">
              <td>${user.email}</td>
              <td class="current-role">${user.role}</td>
              <td>
                <select class="form-select new-role">
                  <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                  <option value="member" ${user.role === 'member' ? 'selected' : ''}>Member</option>
                  <option value="guest" ${user.role === 'guest' ? 'selected' : ''}>Guest</option>
                </select>
              </td>
              <td><button class="btn btn-primary update-role">Update</button></td>
            </tr>`;
          });
          html += '</tbody></table>';
          container.innerHTML = html;

          document.querySelectorAll('.update-role').forEach(button => {
            button.addEventListener('click', (e) => {
              const row = e.target.closest('tr');
              const userId = row.getAttribute('data-userid');
              const newRole = row.querySelector('.new-role').value;
              
              fetch(`/users/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
              })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  row.querySelector('.current-role').textContent = newRole;
                  alert('User role updated successfully');
                } else {
                  alert('Failed to update role');
                }
              })
              .catch(error => {
                console.error('Error updating role:', error);
                alert('Error updating role');
              });
            });
          });
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          document.getElementById('usersContainer').innerHTML = '<div class="alert alert-danger">Error loading users.</div>';
        });
    });
  })();
  