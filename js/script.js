document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const transactionTableBody = document.getElementById("transactionTableBody");
  const totalIncome = document.getElementById("totalIncome");
  const totalExpense = document.getElementById("totalExpense");
  const netBalance = document.getElementById("netBalance");

  let transactions = [];

  addButton.addEventListener("click", addTransaction);

  function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeSelect.value;

    if (description && !isNaN(amount) && amount > 0) {
      const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
      };
      transactions.push(transaction);
      renderTransactions();
      updateSummary();
      clearForm();
    }
  }

  function renderTransactions() {
    transactionTableBody.innerHTML = "";
    transactions.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="border-b text-center p-2">${transaction.description}</td>
                <td class="border-b text-center p-2">${transaction.amount.toFixed(2)}</td>
                <td class="border-b text-center p-2">${transaction.type}</td>
                <td class="border-b text-center p-2">
                    <button class="bg-blue-500 text-white p-1 rounded mr-2" onclick="editTransaction(${
                      transaction.id
                    })">Edit</button>
                    <button class="bg-red-500 text-white p-1 rounded" onclick="deleteTransaction(${
                      transaction.id
                    })">Delete</button>
                </td>
            `;
      transactionTableBody.appendChild(row);
    });
  }

  function updateSummary() {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const balance = income - expense;

    totalIncome.textContent = income.toFixed(2);
    totalExpense.textContent = expense.toFixed(2);
    netBalance.textContent = balance.toFixed(2);
  }

  function clearForm() {
    descriptionInput.value = "";
    amountInput.value = "";
    typeSelect.value = "income";
  }

  window.editTransaction = function (id) {
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
    if (transaction) {
      descriptionInput.value = transaction.description;
      amountInput.value = transaction.amount;
      typeSelect.value = transaction.type;

      deleteTransaction(id);
    }
  };

  window.deleteTransaction = function (id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    renderTransactions();
    updateSummary();
  };
});
