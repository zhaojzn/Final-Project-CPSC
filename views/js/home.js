(() => {
    // Set the current year in the footer
    const setCopyrightYear = () => {
      const span = document.querySelector('footer > kbd > span');
      if (span) {
        span.textContent = new Date().getFullYear();
      }
    };
  
    const displayForm = (event) => {
      event.preventDefault();
      const welcome = document.querySelector('#welcome');
      const registerForm = document.querySelector('#registerForm');
      const loginForm = document.querySelector('#loginForm');
      const extraCards = document.querySelector('#extraCards');
      if (welcome) welcome.style.display = 'none';
      if (registerForm) registerForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'none';
      if (extraCards) extraCards.style.display = 'none';
      if (event.target.id === 'register') {
        if (registerForm) registerForm.style.display = 'block';
      } else if (event.target.id === 'login' || event.target.id === 'loginFromCard') {
        if (loginForm) loginForm.style.display = 'block';
      }
    };

    window.onload = () => {
      setCopyrightYear();
  
      const registerForm = document.querySelector('#registerForm');
      const loginForm = document.querySelector('#loginForm');
      if (registerForm) registerForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'none';
  
      const regBtn = document.querySelector('#register');
      const loginBtn = document.querySelector('#login');
      if (regBtn) regBtn.addEventListener('click', displayForm);
      if (loginBtn) loginBtn.addEventListener('click', displayForm);
  
      const loginFromCardBtn = document.querySelector('#loginFromCard');
      if (loginFromCardBtn) {
        loginFromCardBtn.addEventListener('click', displayForm);
      }
  
    };
  })();
  