const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNameInputValue = document.querySelector("#name").value.trim();
  const emailInputValue = document.querySelector("#email").value.trim();
  const passwordInputValue = document.querySelector("#password").value.trim();
  const confirmPasswordInputValue = document
    .querySelector("#confirm-password")
    .value.trim();

  if (passwordInputValue != confirmPasswordInputValue) {
    return alert("not correct password");
  }

  const user = JSON.stringify({
    full_name: fullNameInputValue,
    email: emailInputValue,
    password: passwordInputValue,
  });

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: myHeaders,
      body: user,
    });

    if (response.ok) {
      registerForm.reset();

      alert("Registered successfuly");
    }

    if (!response.ok || response.status >= 400) {
      const data = await response.json();
      alert(data.error);
    }
  } catch (err) {
    alert(err);
  }
});
