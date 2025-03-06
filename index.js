const container = document.getElementById('container');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');

registerbtn.addEventListener('click', (e) => {
  container.classList.add('active');
})

loginbtn.addEventListener('click', (e) => {
  container.classList.remove('active');
})