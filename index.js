function sConsole(event) {
    //event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const dob = document.getElementById("dob");
    const accept = document.getElementById("accept");
    // console.log(name.value);
    // console.log(email.value);
    // console.log(password.value);
    // console.log(dob.value);
    // console.log(accept.value);

    if (!validateAge(dob.value)) {
        alert("your age must be between 18 and 55");
        return false;
    }
    const table_body = document.querySelector("tbody");
    const row = table_body.insertRow();
    const Name = row.insertCell(0);
    const nameText = document.createTextNode(name.value);
    Name.appendChild(nameText);
    const Email = row.insertCell(1);
    const emailText = document.createTextNode(email.value);
    Email.appendChild(emailText);
    const Password = row.insertCell(2);
    const passwordText = document.createTextNode(password.value);
    Password.appendChild(passwordText);
    const Dob = row.insertCell(3);
    const dobText = document.createTextNode(dob.value);
    Dob.appendChild(dobText);
    const Accept = row.insertCell(4);
    const acceptText = document.createTextNode(accept.value);
    Accept.appendChild(acceptText);
    const tableData = document.getElementById("table_id");
    localStorage.setItem("tableData", tableData);
    const dataset = getDataset();
    localStorage.setItem("dataset", JSON.stringify(dataset));
    console.log(getDataset());
}

function getDataset() {
    const table = document.querySelector("table");
    const tbody = table.tBodies[0];

    const rows = Array.from(tbody.rows);
    const dataset = rows.reduce((accumulator, currentValue) => {
        const [name, email, password, dob, accepted] = Array.from(
            currentValue.cells
        );
        const data = {
            name: name.textContent,
            email: email.textContent,
            password: password.textContent,
            dob: dob.textContent,
            accepted: accepted.textContent,
        };

        accumulator.push(data);

        return accumulator;
    }, []);

    return dataset;
}

function validateAge(birthday) {
    const givenBday = new Date(birthday);
    const currentDate = new Date();
    const age = diff_years(currentDate, givenBday);
    if (age >= 18 && age <= 55) {
        return true;
    } else {
        return false;
    }
}

function diff_years(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
}

window.onload = function () {
    render();
};
function render() {
    const dataset = JSON.parse(localStorage.getItem("dataset"));
    const output = document.getElementById("table_id");

    const rows = dataset
        .map((data) => {
            return `
          <tr>
              <td>${data.name}</td>
              <td>${data.email}</td>
              <td>${data.password}</td>
              <td>${data.dob}</td>
              <td>${data.accepted}</td>
          </tr>`;
        })
        .join("");

    output.innerHTML = `
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Dob</th>
                  <th>Accepted terms?</th>

              </tr>
          </thead>

          <tbody>
              ${rows}
          </tbody>
      </table>`;
}
