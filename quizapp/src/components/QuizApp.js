import React, { useState } from "react";
import SetupCard from "./SetupCard";
import ResultCard from "./ResultCard";
import QuestionCard from "./QuestionCard";

import "./styles.css";

const QUESTION_BANK = [
  { id: "m1", category: "math", difficulty: "easy", prompt: "What is 12 + 15?", options: ["25", "26", "27", "28"], answerIndex: 2 },
  { id: "l1", category: "logic", difficulty: "easy", prompt: "Find the next number: 2, 4, 8, 16, ?", options: ["18", "24", "32", "64"], answerIndex: 2 },
  { id: "v1", category: "verbal", difficulty: "easy", prompt: "Choose the synonym of 'lucid'", options: ["clear", "confused", "dim", "opaque"], answerIndex: 0 },
  { id: "m2", category: "math", difficulty: "medium", prompt: "What is the square root of 144?", options: ["10", "11", "12", "13"], answerIndex: 2 },
  { id: "l2", category: "logic", difficulty: "medium", prompt: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?", options: ["Yes", "No"], answerIndex: 0 },
  { id: "v2", category: "verbal", difficulty: "medium", prompt: "Choose the antonym of 'obscure'", options: ["vague", "clear", "hidden", "ambiguous"], answerIndex: 1 },
  { id: "m3", category: "math", difficulty: "hard", prompt: "What is the derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], answerIndex: 0 },
  { id: "l3", category: "logic", difficulty: "hard", prompt: "All Zips are Zoodles. Some Zoodles are Zonks. Are some Zips definitely Zonks?", options: ["Yes", "No"], answerIndex: 1 },
  { id: "v3", category: "verbal", difficulty: "hard", prompt: "Choose the synonym of 'obfuscate'", options: ["clarify", "confuse", "illuminate", "simplify"], answerIndex: 1 },
  { id: "m4", category: "math", difficulty: "easy", prompt: "What is 7 x 8?", options: ["54", "56", "58", "60"], answerIndex: 1 },
  { id: "l4", category: "logic", difficulty: "easy", prompt: "What comes next in the sequence: A, C, E, G, ?", options: ["H", "I", "J", "K"], answerIndex: 1 },
  { id: "v4", category: "verbal", difficulty: "easy", prompt: "Choose the antonym of 'happy'", options: ["joyful", "elated", "sad", "cheerful"], answerIndex: 2 }

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
        <ResultCard
          score={score}
          total={questions.length}
          onRestart={startQuiz}
          onReset={resetAll}
        />
      )}
    </div>
  );
}