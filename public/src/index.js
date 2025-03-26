document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  if (typeof bcrypt === 'undefined') {
    console.error("bcrypt.js is not loaded properly!");
    return;  // Exit early if bcrypt is not loaded
  }

  const container = document.getElementById("container");
  const registerbtn = document.getElementById("register");
  const loginbtn = document.getElementById("login");
  const titlebtn = document.getElementById("titlebtn");
  const welcomemsg = document.getElementById("welcome");
  const overlay = document.getElementById("overlay");
  const clickSound = document.getElementById("clickSound");
  const swooshSound = document.getElementById("swooshSound");

  const backgroundMusic = document.getElementById("backgroundMusic");
  const muteButton = document.getElementById("muteButton");

  // Function to toggle mute
  muteButton.addEventListener("click", () => {
    // Toggle the muted state of the audio
    if (backgroundMusic.muted) {
      backgroundMusic.muted = false;
      muteButton.textContent = "Mute Music"; // Change button text to "Mute Music"
    } else {
      backgroundMusic.muted = true;
      muteButton.textContent = "Unmute Music"; // Change button text to "Unmute Music"
    }
  });

  // Button event listeners
  registerbtn.addEventListener("click", () => {
    container.classList.add("active");
    clickSound.play();
  });

  loginbtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  titlebtn.addEventListener("click", function () {
    titlebtn.classList.remove("idle");
    titlebtn.classList.add("active");
    titlebtn.disabled = true; // Make the button unclickable


    container.classList.add("show");
    welcomemsg.classList.add("hide");
    overlay.style.display = "block";
  });

  const buttons = document.querySelectorAll("button");

  // Add event listener to all buttons
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Play click sound when button is clicked
      clickSound.currentTime = 0; // Reset the sound to the beginning
      clickSound.play(); // Play the click sound
    });
  });

  container.addEventListener("transitionstart", () => {
    swooshSound.currentTime = 0; // Reset to the start of the sound
    swooshSound.play(); // Play the swoosh sound
  });

  // Handle Sign-Up form
  const signUpForm = document.getElementById("signUpForm");

  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const nameInput = signUpForm.querySelector("input[placeholder='Name']");
    const usernameInput = signUpForm.querySelector("input[placeholder='Username']");
    const passwordInput = signUpForm.querySelector("input[placeholder='Password']");

    // Check if form fields exist
    if (nameInput && usernameInput && passwordInput) {
      const name = nameInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      // At least one uppercase letter ((?=.*[A-Z]))
      //
      // At least one number ((?=.*\d))
      //
      // Minimum length of 6 characters (.{6,})

      if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long, contain at least one uppercase letter and one number.");
        return;  // Stop the form submission
      }

      if (localStorage.getItem(username)) {
        alert("Username already exists! Try a different one.");
      } else {
        // Hash the password before saving
        bcrypt.hash(password, 10, function (err, hashedPassword) {
          if (err) {
            alert("Something went wrong, please try again.");
            return;
          }

          // Save user data to localStorage
          const user = { name, password: hashedPassword };
          localStorage.setItem(username, JSON.stringify(user));

          localStorage.setItem("namee", name);

          alert("Account created successfully! You can now sign in.");
          signUpForm.reset(); // Reset the form
        });
      }
    } else {
      console.error("Some form fields are missing");
    }
  });

  // Handle Sign-In form
  const signInForm = document.getElementById("signInForm");

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const usernameInput = signInForm.querySelector("input[placeholder='Username']");
    const passwordInput = signInForm.querySelector("input[placeholder='Password']");

    // Check if form fields exist
    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      const userData = localStorage.getItem(username);

      if (!userData) {
        alert("User not found. Please sign up first.");
      } else {
        const storedUser = JSON.parse(userData);

        // Compare the hashed password with the one entered during sign-in
        bcrypt.compare(password, storedUser.password, function (err, result) {
          if (err) {
            alert("Something went wrong, please try again.");
            return;
          }

          if (result) {
            alert(`Welcome, ${storedUser.name}!`);
            localStorage.setItem("loggedInUser", storedUser.username);
            localStorage.setItem("loggedInUser", "username"); // Store username

            window.location.href = "/map";
            // Redirect to the game page after successful login
          } else {
            alert("Incorrect password. Try again.");
          }
        });
      }
    } else {
      console.error("Some form fields are missing");
    }
  });
});
