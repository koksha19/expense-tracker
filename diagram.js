const ctx = document.getElementById("diagram");

new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: [
            "Food",
            "Entertainment",
            "Healthcare",
            "Taxes",
            "Rent",
            "Insurance",
            "Other",
        ],
        datasets: [
            {
                label: "Expense Categories",
                data: [12, 19, 3, 5, 2, 3],
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