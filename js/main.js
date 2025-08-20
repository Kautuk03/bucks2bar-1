
// Chart.js integration and dynamic update (Income and Expenses visualized separately)
let barChart;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function getIncomeData() {
  return months.map(m => {
    const mShort = m.toLowerCase().slice(0,3);
    return parseFloat(document.getElementById('income-' + mShort).value) || 0;
  });
}
function getExpensesData() {
  return months.map(m => {
    const mShort = m.toLowerCase().slice(0,3);
    return parseFloat(document.getElementById('expenses-' + mShort).value) || 0;
  });
}
function updateChart() {
  if (barChart) {
    barChart.data.datasets[0].data = getIncomeData();
    barChart.data.datasets[1].data = getExpensesData();
    barChart.update();
  }
}
function downloadChart() {
  if (barChart) {
    const link = document.createElement('a');
    link.href = barChart.toBase64Image();
    link.download = 'bucks2bar-chart.png';
    link.click();
  }
}
function validateExpensesAlert() {
  let invalid = false;
  months.forEach(m => {
    const mShort = m.toLowerCase().slice(0,3);
    const incomeInput = document.getElementById('income-' + mShort);
    const expensesInput = document.getElementById('expenses-' + mShort);
    if (incomeInput && expensesInput) {
      const income = parseFloat(incomeInput.value) || 0;
      const expenses = parseFloat(expensesInput.value) || 0;
      if (expenses > income) {
        invalid = true;
        expensesInput.classList.add('is-invalid');
      } else {
        expensesInput.classList.remove('is-invalid');
      }
    }
  });
  if (invalid) {
    alert('Expenses should not exceed income for any month.');
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('barChart');
  if (ctx) {
    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: getIncomeData(),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: getExpensesData(),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Monthly Income and Expenses'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        }
      }
    });
  }
  // Add event listeners to all inputs
  months.forEach(m => {
    const mShort = m.toLowerCase().slice(0,3);
    const incomeInput = document.getElementById('income-' + mShort);
    const expensesInput = document.getElementById('expenses-' + mShort);
    if (incomeInput) incomeInput.addEventListener('input', function() {
      updateChart();
      validateExpensesAlert();
    });
    if (expensesInput) expensesInput.addEventListener('input', function() {
      updateChart();
      validateExpensesAlert();
    });
  });
});
