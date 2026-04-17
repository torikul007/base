const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzJuc0kYSTOotMYQvliRmq1MAHhGZ4BGAiusrpFbC3bBAiKAWHJGdJ0i6-NPcqnkiXF/exec";

const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE";

// login function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  document.getElementById("msg").innerText = data.status;

  loadSheet(); // refresh table after login
}

// load sheet data
async function loadSheet() {
  const res = await fetch(WEB_APP_URL);
  const data = await res.json();

  const table = document.getElementById("sheetData");
  table.innerHTML = "";

  // skip header row
  for (let i = 1; i < data.length; i++) {
    let row = data[i];

    let tr = `
      <tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
      </tr>
    `;

    table.innerHTML += tr;
  }
}

// auto refresh every 3 seconds (REAL TIME)
setInterval(loadSheet, 3000);

// first load
loadSheet();
