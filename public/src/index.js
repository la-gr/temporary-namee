const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");
const titlebtn = document.getElementById("titlebtn");
const welcomemsg = document.getElementById("welcome");
const overlay = document.getElementById('overlay');

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

titlebtn.addEventListener("click", function() {
  titlebtn.classList.remove("idle");
  titlebtn.classList.add("active");
  titlebtn.disabled = true; // Make the button unclickable

  container.classList.add("show");
  welcomemsg.classList.add("hide");
  overlay.style.display = 'block';
});

// container.style.display ="none";
//
// function openTitle() {
//   titlebtn.style.display = "block";
// }
//
// titlebtn.addEventListener('click', openTitle);

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// <a href="#" onClick="signOut();">Sign out</a>
// <script>
//   function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//   console.log('User signed out.');
// });
// }
// </script>
