'use strict';

import { sumsByCategories } from "./app.js";

const ctx = document.getElementById("diagram").getContext("2d");

let expenseChart;

const initializeChart = (sumsByCategories) => {
    expenseChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(sumsByCategories),
            datasets: [
                {
                    label: "Expense Categories",
                    data: Object.values(sumsByCategories),
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

const updateChart = () => {
    expenseChart.data.datasets[0].data = Object.values(sumsByCategories);
    expenseChart.update();
};

export { updateChart, initializeChart };