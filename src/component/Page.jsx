// SavingsCalculator.js

import React, { useState } from "react";
import "./SavingsCalculator.css";

const SavingsCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [yearsToGoal, setYearsToGoal] = useState(null);

  const calculateYearsToGoal = () => {
    const monthlyDepositFloat = parseFloat(monthlyDeposit);
    const interestRateFloat = parseFloat(interestRate) / 100;

    if (
      isNaN(monthlyDepositFloat) ||
      isNaN(interestRateFloat) ||
      monthlyDepositFloat <= 0 ||
      interestRateFloat <= 0
    ) {
      alert(
        "Por favor, insira valores válidos para o depósito mensal e a taxa de juros."
      );
      return;
    }

    const futureValue = 1000000; // Valor desejado
    const monthlyInterestRate = interestRateFloat / 12;

    let monthsToGoal = 0;
    let currentBalance = 0;

    while (currentBalance < futureValue) {
      currentBalance =
        (currentBalance + monthlyDepositFloat) * (1 + monthlyInterestRate);
      monthsToGoal++;
    }

    const yearsToGoal = Math.floor(monthsToGoal / 12);
    setYearsToGoal(yearsToGoal);
  };

  return (
    <div className="savings-calculator">
      <h2>How Long to Get a Million?</h2>
      <label>
        Amount deposited monthly:
        <input
          type="number"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(e.target.value)}
        />
      </label>
      <br />
      <label>
        Annual interest rate (%):
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </label>
      <br />
      <button onClick={calculateYearsToGoal}>Calcular</button>
      {yearsToGoal !== null && (
        <p>
          It will take approximately {yearsToGoal} years to put together a
          million.
        </p>
      )}
    </div>
  );
};

export default SavingsCalculator;
