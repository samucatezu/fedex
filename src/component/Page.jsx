import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./SavingsCalculator.css";

const SavingsCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);
  const [inflationRate, setInflationRate] = useState("");
  const [amountInvested, setAmountInvested] = useState(""); // New state for amount currently invested
  const [showCTA, setShowCTA] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Update the chart whenever the result changes
    if (result) {
      updateChart(result);
      setShowCTA(true);

    }
  }, [result]);

  const calculateMonthsToGoal = () => {
    const monthlyDepositFloat = parseFloat(monthlyDeposit);
    const interestRateFloat = parseFloat(interestRate) / 100;
    const amountInvestedFloat = parseFloat(amountInvested); // Parse amount currently invested

    if (
      isNaN(monthlyDepositFloat) ||
      isNaN(interestRateFloat) ||
      isNaN(amountInvestedFloat) || // Check if amount currently invested is a valid number
      monthlyDepositFloat <= 0 ||
      interestRateFloat <= 0 ||
      amountInvestedFloat < 0 // Ensure amount currently invested is not negative
    ) {
      alert("Please enter valid values for monthly deposit, interest rate, and amount currently invested.");
      return;
    }

    const futureValue = 1000000; // Desired value
    const monthlyInterestRate = interestRateFloat / 12;

    let monthsToGoal = 0;
    let currentBalance = amountInvestedFloat; // Set initial current balance to amount currently invested
    let realFutureValue = futureValue;
    const inflationRateFloat = parseFloat(inflationRate) / 100;
    const chartData = [];
    const nominalChartData = [];
    const accumulatedValueData = [];
    while (currentBalance < realFutureValue) {
      currentBalance = (currentBalance + monthlyDepositFloat) * (1 + monthlyInterestRate);

      realFutureValue *= (1 + inflationRateFloat / 12);

      monthsToGoal++;
      chartData.push(currentBalance);
      nominalChartData.push(currentBalance);
      accumulatedValueData.push(monthlyDepositFloat * monthsToGoal);
    }

    const years = Math.floor(monthsToGoal / 12);
    const remainingMonths = monthsToGoal % 12;

    setResult({ years, remainingMonths, chartData, nominalChartData, accumulatedValueData });
  };

  const updateChart = (result) => {
    const ctx = document.getElementById("savingsChart").getContext("2d");

    if (chartInstance !== null) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from(
          { length: result.years * 12 + result.remainingMonths },
          (_, i) => i + 1
        ),
        datasets: [
          {
            label: "Balance Over Time",
            borderColor: "rgba(75, 192, 192, 1)",
            data: result.chartData,
            fill: false,
          },
          {
            label: "Accumulated Value Without Interest",
            borderColor: "rgba(255, 99, 132, 1)",
            data: result.accumulatedValueData,
            fill: false,
          }
        ],
      },
      options: {
        scales: {
          x: {
            // ...
          },
          y: {
            beginAtZero: true,
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: true,
          callbacks: {
            label: function(tooltipItem, data) {
              const datasetIndex = tooltipItem.datasetIndex;
              const value = data.datasets[datasetIndex].data[tooltipItem.index];
              const label = data.datasets[datasetIndex].label;
              return `${label}: $${value.toLocaleString()}`;
            }
          }
        }
      },
    });

    // Store the new chart instance
    setChartInstance(newChartInstance);
  };

  return (
    <div>
      <div className="savings-calculator">
        <h2>How Long to Get a Million?</h2>
        <label>
          Amount currently invested:
          <input
            type="number"
            value={amountInvested}
            onChange={(e) => setAmountInvested(e.target.value)}
          />
        </label>
        <label>
          Monthly deposit:
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(e.target.value)}
          />
        </label>
        <label>
          Annual interest rate (%):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </label>
        <label>
          Annual inflation rate (%):
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
          />
        </label>
        
        <button onClick={calculateMonthsToGoal}>Calculate</button>
        {result !== null && (
          <div>
            <p>
              It will take approximately {result.years} years and{" "}
              {result.remainingMonths} month(s) to reach one million adjusted by Inflation.
            </p>
            <canvas id="savingsChart" width="400" height="200"></canvas>
          </div>
        )}

{showCTA && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <p style={{ marginBottom: '10px' }}>Start investing today, paving the way for a prosperous tomorrow.</p>
  <a href="https://www.cambridgeassociates.com" style={{ 
    display: 'inline-block',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  }}>
    Invest with the bests 
  </a>
    <img src="https://www.ballstonva.org/wp-content/uploads/2022/12/Cambridge-Associates.png" alt="Cambridge Associates" style={{ maxWidth: '60%', height: 'auto' }} />
  </div>
)}
      </div>

      {/* YouTube Videos Section - Conditionally Rendered */}
      {result !== null && (
        <div className="videos-section">
          <div className="video-container">
            <h3>What 1 Million Dollars Can Buy in Chicago</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ziRVIkJKP0U"
              title="House in the USA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-container">
            <h3>What 5 Million Reais Can Buy in Rio de Janeiro</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/OuN4NWdtUZw"
              title="Real Estate in Brazil"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsCalculator;
