const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInputValue = document.querySelector("#email").value.trim();
  const passwordInputValue = document.querySelector("#password").value.trim();

  const user = JSON.stringify({
    email: emailInputValue,
    password: passwordInputValue,
  });

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: myHeaders,
      body: user,
    });

    const userData = await response.json();

    if (response.ok) {
      loginForm.reset();

      localStorage.setItem("token", userData.token);

      alert(userData.message);
      return window.location.assign(`./groups.html`);
    }

    if (!response.ok || response.status >= 400) {
      return alert(userData.error || userData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
});
