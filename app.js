'use strict';

const state = {
    balance: 4800,
    income: 5000,
    expense: 200,
    transactions: [
        { type: 'income', category: 'salary', sum: 5000, date: '14-05-2024' },
        { type: 'expense', category: 'groceries', sum: 200, date: '16-05-2024' },
    ],
};

const balance = document.querySelector('#balance');
const income = document.querySelector('#income');
const expense = document.querySelector('#expense');
const transactionsTable = document.querySelector('.transactions');

const render = () => {
    balance.innerHTML = `$${state.balance}`;
    income.innerHTML = `$${state.income}`;
    expense.innerHTML = `$${state.expense}`;

    const transactions = state.transactions.length;

    for(let i = 0; i < transactions; i++) {
        const transactionElement = document.createElement('tr');
        const type = document.createElement('td');
        const category = document.createElement('td');
        const sum = document.createElement('td');
        const date = document.createElement('td');
        const deleteButton = document.createElement('td');
        const btn = document.createElement('button');

        const transactionToAppend = state.transactions[i];

        type.append(transactionToAppend.type);
        transactionElement.appendChild(type);

        category.append(transactionToAppend.category);
        transactionElement.appendChild(category);

        sum.append(transactionToAppend.sum);
        transactionElement.appendChild(sum);

        date.append(transactionToAppend.date);
        transactionElement.appendChild(date);

        btn.append('Delete');
        deleteButton.appendChild(btn);
        transactionElement.appendChild(deleteButton);

        transactionsTable.appendChild(transactionElement);
        console.log(type, category, sum, date, deleteButton, btn);
    }
}
render();


