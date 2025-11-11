import React, { useState } from "react";
import SetupCard from "./SetupCard";
import ResultsCard from "./ResultsCard";
import QuestionCard from "./components/QuestionCard";

import "./styles.css";

const QUESTION_BANK = [
  { id: "m1", category: "math", difficulty: "easy", prompt: "What is 12 + 15?", options: ["25", "26", "27", "28"], answerIndex: 2 },
  { id: "l1", category: "logic", difficulty: "easy", prompt: "Find the next number: 2, 4, 8, 16, ?", options: ["18", "24", "32", "64"], answerIndex: 2 },
  { id: "v1", category: "verbal", difficulty: "easy", prompt: "Choose the synonym of 'lucid'", options: ["clear", "confused", "dim", "opaque"], answerIndex: 0 },

];

export default function QuizApp() {
  const [phase, setPhase] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuestions([...QUESTION_BANK].sort(() => Math.random() - 0.5).slice(0, 3));
    setPhase("quiz");
    setIndex(0);
    setScore(0);
  };

  const submitAnswer = (choiceIndex) => {
    if (choiceIndex === questions[index].answerIndex) {
      setScore((s) => s + 1);
    }
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setPhase("results");
    }
  };

  const resetAll = () => {
    setPhase("setup");
    setQuestions([]);
    setIndex(0);
    setScore(0);
  };

  return (
    <div className="quiz-app">
      {phase === "setup" && <SetupCard onStart={startQuiz} />}
      {phase === "quiz" && questions.length > 0 && (
        <QuestionCard
          question={questions[index]}
          index={index}
          total={questions.length}
          onAnswer={submitAnswer}
        />
      )}
      {phase === "results" && (
        <ResultsCard
          score={score}
          total={questions.length}
          onRestart={startQuiz}
          onReset={resetAll}
        />
      )}
    </div>
  );
}