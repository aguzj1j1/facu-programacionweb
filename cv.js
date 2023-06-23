const form = document.getElementById("contact-form");
const nameInput = document.getElementById("nombre");
const emailInput = document.getElementById("correo");
const messageInput = document.getElementById("mensaje");
const salaryInput = document.getElementById("sueldo");
const submittedList = document.getElementById("submitted-list");
const sortBySelect = document.getElementById("ordenar-por");
const info = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;
  const salary = salaryInput.value;

  // Validación de sueldo mínimo
  if (salary < 10000) {
    alert("El sueldo mínimo debe ser igual o mayor a 10000 pesos.");
    return;
  }

  info.push({ name, email, message, salary });

  clearList();
  renderGrid();
  clearForm();

  if (info.length > 1) {
    sortBySelect.disabled = false;
  }
});

sortBySelect.addEventListener("change", function () {
  clearList();
  sortInfo();
  renderGrid();
});

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
  salaryInput.value = "";
}

function clearList() {
  submittedList.innerHTML = "";
}

function convertToCurrency(amount, currency) {
  const exchangeRates = {
    USD: 0.011, // Tasa de cambio ficticia para ejemplo
    EUR: 0.009, // Tasa de cambio ficticia para ejemplo
  };

  const convertedAmount = amount * exchangeRates[currency];
  return convertedAmount.toFixed(2);
}

function sortInfo() {
  const sortBy = sortBySelect.value;

  switch (sortBy) {
    case "nombre":
      info.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "email":
      info.sort((a, b) => a.email.localeCompare(b.email));
      break;
    case "mensaje":
      info.sort((a, b) => a.message.localeCompare(b.message));
      break;
    case "salario":
      info.sort((a, b) => a.salary - b.salary);
      break;
    default:
      break;
  }
}

function renderGrid() {
  info.forEach((item) => {
    const gridItem = document.createElement("div");
    gridItem.className = "col-md-12 mb-12";
    gridItem.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text"><strong>Correo electrónico:</strong> ${item.email}</p>
          <p class="card-text"><strong>Mensaje:</strong> ${item.message}</p>
          <p class="card-text"><strong>Sueldo mínimo:</strong> ${item.salary} ARS (${convertToCurrency(
      item.salary,
      "USD"
    )} USD, ${convertToCurrency(item.salary, "EUR")} EUR)</p>
        </div>
      </div>
    `;
    submittedList.appendChild(gridItem);
  });
}

sortBySelect.disabled = true; // Deshabilitar inicialmente el campo de selección
