import React, { useState } from "react";

export default function QuizPlayer({ quizData, onExit }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = quizData[index];

  const handleSubmit = () => {
    if (selected === current.correctAnswer) {
      setScore(score + 1);
    }

    if (index + 1 < quizData.length) {
      setIndex(index + 1);
      setSelected("");
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div style={styles.card}>
        <h2>Quiz Completed!</h2>
        <p>You scored {score} / {quizData.length}</p>

        <button style={styles.button} onClick={onExit}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2>Question {index + 1} / {quizData.length}</h2>
      <p style={styles.question}>{current.question}</p>

      {current.options.map((opt, idx) => (
        <button
          key={idx}
          style={{
            ...styles.option,
            backgroundColor: selected === opt ? "#007BFF" : "white",
            color: selected === opt ? "white" : "black",
          }}
          onClick={() => setSelected(opt)}
        >
          {opt}
        </button>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!selected}
        style={styles.nextButton}
      >
        {index + 1 === quizData.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    margin: "auto",
    width: "500px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  option: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #007BFF",
    cursor: "pointer",
    textAlign: "left",
  },
  nextButton: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  button: {
    padding: "12px 20px",
    marginTop: "20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
