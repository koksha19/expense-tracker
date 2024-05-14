'use strict';

const state = {
    balance: null,
    income: null,
    expense: null,
    transactions: [
        { date: '14-05-2024', type: 'income', category: 'salary', sum: 5000 },
        { date: '16-05-2024', type: 'expense', category: 'groceries', sum: 200 },
        { date: '17-05-2024', type: 'expense', category: 'rent', sum: 1100 },
        { date: '18-05-2024', type: 'income', category: 'salary', sum: 5000 },
    ],
};

const balance = document.querySelector('#balance');
const income = document.querySelector('#income');
const expense = document.querySelector('#expense');
const transactionsTable = document.querySelector('.transactions');

const loadPage = () => {
    updateBalance();
    render();
}

const render = () => {
    balance.innerHTML = `$${state.balance}`;
    income.innerHTML = `$${state.income}`;
    expense.innerHTML = `$${state.expense}`;

    const transactions = state.transactions.length;
    for(let i = 0; i < transactions; i++) {
        const transactionElement = document.createElement('tr');
        const date = document.createElement('td');
        const type = document.createElement('td');
        const category = document.createElement('td');
        const sum = document.createElement('td');
        const deleteButton = document.createElement('td');
        const btn = document.createElement('button');

        const transaction = state.transactions[i];

        date.append(transaction.date);
        transactionElement.appendChild(date);

        type.append(transaction.type);
        transactionElement.appendChild(type);

        category.append(transaction.category);
        transactionElement.appendChild(category);

        sum.append(transaction.sum);
        transactionElement.appendChild(sum);

        btn.append('Delete');
        deleteButton.appendChild(btn);
        transactionElement.appendChild(deleteButton);

        transactionsTable.appendChild(transactionElement);
    }
}
const updateBalance = () => {
    let balance;
    let income = 0;
    let expense = 0;

    const transactions = state.transactions.length;
    for(let i = 0; i < transactions; i++) {
        const transaction = state.transactions[i];
        if(transaction.type === 'income') {
            income += transaction.sum;
        } else {
            expense += transaction.sum;
        }
        console.log(income, expense);
    }
    balance = income - expense;

    state.balance = balance;
    state.income = income;
    state.expense = expense;
}

loadPage();


