import React from "react";

export default function ResultsCard({ score, total, onRestart, onReset }) {
  return (
    <div className="card">
      <h2>Results</h2>
      <p>Score: {score} / {total}</p>
      <button onClick={onRestart}>New Quiz</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
