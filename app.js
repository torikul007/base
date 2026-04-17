const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzJuc0kYSTOotMYQvliRmq1MAHhGZ4BGAiusrpFbC3bBAiKAWHJGdJ0i6-NPcqnkiXF/exec";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.style.color = "red";
    msg.innerText = "Please fill all fields";
    return;
  }

  msg.style.color = "black";
  msg.innerText = "Logging in...";

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.status === "success") {
      msg.style.color = "green";
      msg.innerText = "Login saved to Sheet ✔";
    } else {
      msg.style.color = "red";
      msg.innerText = "Something went wrong";
    }

  } catch (error) {
    msg.style.color = "red";
    msg.innerText = "Network error";
  }
}
