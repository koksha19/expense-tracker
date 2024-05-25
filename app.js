"use strict";

import {initializeChart, updateChart} from "./diagram.js";

let state = {
    balance: null,
    income: null,
    expense: null,
    transactions: [],
};

let sumsByCategories = {
    Food: 0,
    Entertainment: 0,
    Healthcare: 0,
    Taxes: 0,
    Rent: 0,
    Insurance: 0,
    Other: 0,
}

const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const addTransactionBtn = document.querySelector(".btn");
const transactionsTable = document.querySelector(".transactions");

const form = {
    type: document.querySelector("#type"),
    category: document.querySelector("#category"),
    sum: document.querySelector("#sum"),
    date: document.querySelector("#date"),
};

const loadData = () => {
    const currentState = localStorage.getItem("expense-tracker");
    if (currentState != null) state = JSON.parse(currentState);
    updateBalance();
    addTransaction();
    initializeChart(sumsByCategories);
};

const clearForm = ({ ...form }) => {
    form.date.value = null;
    form.type.value = null;
    form.category.value = null;
    form.sum.value = null;
};

const render = () => {
    balance.innerHTML = `$${state.balance}`;
    income.innerHTML = `$${state.income}`;
    expense.innerHTML = `$${state.expense}`;

    clearForm(form);

    transactionsTable.innerHTML = "";
    const transactions = state.transactions.length;
    for (let i = 0; i < transactions; i++) {
        const transactionElement = document.createElement("tr");
        const date = document.createElement("td");
        const type = document.createElement("td");
        const category = document.createElement("td");
        const sum = document.createElement("td");
        const deleteButton = document.createElement("td");
        const btn = document.createElement("button");

        const transaction = state.transactions[i];

        date.append(transaction.date);
        transactionElement.appendChild(date);

        type.append(transaction.type);
        transactionElement.appendChild(type);

        category.append(transaction.category);
        transactionElement.appendChild(category);

        sum.append(transaction.sum);
        transactionElement.appendChild(sum);

        btn.append("Delete");
        btn.addEventListener("click", () => {
            deleteTransaction(transaction);
            updateBalance();
        });
        deleteButton.appendChild(btn);
        transactionElement.appendChild(deleteButton);

        transactionsTable.appendChild(transactionElement);
    }
};
const updateBalance = () => {
    let balance;
    let income = 0;
    let expense = 0;

    const transactions = state.transactions.length;
    for (let i = 0; i < transactions; i++) {
        const transaction = state.transactions[i];
        if (transaction.type === "income") {
            income += transaction.sum;
        } else {
            expense += transaction.sum;
        }
    }
    balance = income - expense;

    state.balance = balance;
    state.income = income;
    state.expense = expense;

    localStorage.setItem("expense-tracker", JSON.stringify(state));

    render();
};

const addTransaction = () => {
    addTransactionBtn.addEventListener("click", () => {
        const transaction = {
            date: form.date.value,
            type: form.type.value,
            category: form.category.value,
            sum: Number(form.sum.value),
        };

        const expense = {
            category: transaction.category,
            sum: transaction.sum,
        }

        if (transaction.type === 'expense') {
            const expenseCategory = expense.category;
            const expenseSum = expense.sum;
            sumsByCategories[expenseCategory] += expenseSum;
            updateChart();
        }

        for (const value of Object.values(transaction)) {
            if (!value) {
                alert("Fill in all fields");
                return;
            }
        }

        state.transactions.push(transaction);
        updateBalance();
    });
};

const deleteTransaction = (transactionToDelete) => {
    const transactions = state.transactions;
    transactions.splice(transactions.indexOf(transactionToDelete), 1);
};

loadData();

export { sumsByCategories, state };

