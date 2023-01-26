
  const groupInputValue = document.querySelector("#group-input").value.trim();

  const newGroup = JSON.stringify({
    group_id: +groupInputValue,
  });

  try {
    const response = await fetch("http://localhost:5000/accounts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newGroup,
    });

    const groupData = await response.json();

    if (response.ok) {
      if (groupData.message.includes("User is in group")) {
        return alert(groupData.message);
      }

      alert(groupData.message);

      return window.location.reload();
    }

    if (!response.ok || response.status >= 400) {
      return alert(groupData.error || groupData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }

