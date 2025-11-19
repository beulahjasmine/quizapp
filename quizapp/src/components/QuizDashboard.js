import React, { useState } from "react";
import axios from "axios";
import QuizPlayer from "./QuizPlayer";

export default function QuizDashboard() {
  const [questionsCount, setQuestionsCount] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/questions?limit=${questionsCount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizData(response.data);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      alert("Failed to load quiz questions.");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    fetchQuiz();
  };

  return (
    <div style={styles.container}>
      {!quizStarted ? (
        <div style={styles.card}>
          <h2 style={styles.title}>Quiz Dashboard</h2>
          <p>Select the number of questions you want for the quiz.</p>

          <label htmlFor="questions">Number of Questions:</label>
          <select
            id="questions"
            value={questionsCount}
            onChange={(e) => setQuestionsCount(Number(e.target.value))}
            style={styles.select}
          >
            {[5, 10, 15, 20, 25].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>

          <button style={styles.button} onClick={startQuiz} disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>
        </div>
      ) : (
        <QuizPlayer
          quizData={quizData}
          onExit={() => {
            setQuizStarted(false);
            setQuizData([]);
          }}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
