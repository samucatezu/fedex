// SavingsCalculator.jsx

import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./SavingsCalculator.css";

const SavingsCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Atualiza o gráfico sempre que o resultado for alterado
    if (result) {
      updateChart(result);
    }
  }, [result]);

  const calculateMonthsToGoal = () => {
    const monthlyDepositFloat = parseFloat(monthlyDeposit);
    const interestRateFloat = parseFloat(interestRate) / 100;

    if (
      isNaN(monthlyDepositFloat) ||
      isNaN(interestRateFloat) ||
      monthlyDepositFloat <= 0 ||
      interestRateFloat <= 0
    ) {
      alert("Please enter valid values for monthly deposit and interest rate.");
      return;
    }

    const futureValue = 1000000; // Valor desejado
    const monthlyInterestRate = interestRateFloat / 12;

    let monthsToGoal = 0;
    let currentBalance = 0;
    const chartData = [];

    while (currentBalance < futureValue) {
      currentBalance =
        (currentBalance + monthlyDepositFloat) * (1 + monthlyInterestRate);
      monthsToGoal++;
      chartData.push(currentBalance);
    }

    const years = Math.floor(monthsToGoal / 12);
    const remainingMonths = monthsToGoal % 12;

    setResult({ years, remainingMonths, chartData });
  };

  const updateChart = (result) => {
    const ctx = document.getElementById("savingsChart").getContext("2d");

    // Destrói manualmente a instância anterior do gráfico
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
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              stepSize: 12, // Mostra rótulos a cada 12 meses
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Armazena a nova instância do gráfico
    setChartInstance(newChartInstance);
  };

  return (
    <div>
      {/* Savings Calculator Section */}
      <div className="savings-calculator">
        <h2>How Long to Get a Million?</h2>
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
        <button onClick={calculateMonthsToGoal}>Calculate</button>
        {result !== null && (
          <div>
            <p>
              It will take approximately {result.years} years and{" "}
              {result.remainingMonths} month(s) to reach one million.
            </p>
            <canvas id="savingsChart" width="400" height="200"></canvas>
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
