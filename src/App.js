import React, { useState } from 'react';
import './App.css';

function App() {
  const ques = [
    {
      questiontext: "What is ReactJS?",
      option: [
        "Server-side framework",
        "User interface framework",
        "Both a and b",
        "None of the above",
      ],
      correct: 1, // Index of the correct answer
    },
    {
      questiontext: "What is Babel?",
      option: [
        "JavaScript compiler",
        "JavaScript Interpreter",
        "JavaScript transpiler",
        "None of the above",
      ],
      correct: 0,
    },
    {
      questiontext: "Which company developed ReactJS?",
      option: ["Apple", "Facebook", "Google", "Twitter"],
      correct: 1,
    },
    {
      questiontext: "Which of the following are two ways to handle data in React?",
      option: [
        "Services",
        "State and props",
        "State and services",
        "State and component",
      ],
      correct: 1,
    },
    {
      questiontext:
        "Which of the following is used to access a function fetch() from an h1 element in JSX?",
      option: [
        "<h1>${fetch()}</h1>",
        "<h1>{fetch}</h1>",
        "<h1>${fetch}</h1>",
        "<h1>{fetch()}</h1>",
      ],
      correct: 3,
    },
  ];

  const [count, setCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(ques.length).fill(null)); // Tracks selected options for all questions

  function handleNextQuestion() {
    // Save the current selected option
    const updatedAnswers = [...answers];
    updatedAnswers[count] = selectedOption;
    setAnswers(updatedAnswers);

    // Check if the selected option is correct when moving forward
    if (selectedOption === ques[count].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or complete the quiz
    if (count < ques.length - 1) {
      setCount(count + 1);
      setSelectedOption(updatedAnswers[count + 1]); // Pre-fill the option for the next question if previously answered
    } else {
      setQuizCompleted(true);
    }
  }

  function handlePreviousQuestion() {
    // Move to the previous question
    if (count > 0) {
      setCount(count - 1);
      setSelectedOption(answers[count - 1]); // Pre-fill the option for the previous question
    }
  }

  function resetQuiz() {
    setCount(0);
    setQuizCompleted(false);
    setScore(0);
    setSelectedOption(null);
    setAnswers(Array(ques.length).fill(null));
  }

  return (
    <div className="container">
      <h1>My Quiz Application</h1>
      <div className="card">
        {quizCompleted ? (
          <>
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score}/{ques.length}</p>
            <button onClick={resetQuiz} id='rst'>Restart Quiz</button>
          </>
        ) : (
          <>
            <h2>Question No: {count + 1}/{ques.length}</h2>
            <h3>{ques[count].questiontext}</h3>

            <div id="option">
              {ques[count].option.map((x, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  style={{
                    background: selectedOption === index ? '#d3d3d3' : 'white',
                    cursor: 'pointer',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                  }}
                >
                  {x}
                </li>
              ))}
            </div>

            <br />
            <button
            id='prv'
              onClick={handlePreviousQuestion}
              disabled={count === 0}
            >
              Previous
            </button>
            <button
            id='nxt'
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {count === ques.length - 1 ? 'Submit' : 'Next'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
