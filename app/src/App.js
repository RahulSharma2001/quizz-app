import { useEffect, useRef, useState } from "react";
import Question from "./components/Question";
import "./App.css";
function App() {
  const [questionArray, setQuestionArray] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(0);
  const [questionAvailable, setQuestionAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [marks, setMarks] = useState(0);
  const pRef = useRef(null);
  useEffect(() => {
    async function fet() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10");
        const response = await res.json();
        setQuestionArray(response.results);
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    }

    fet();
  }, []);

  useEffect(() => {
    let questionTimer = setInterval(() => {
      setQuestionNumber((pev) => {
        let nextQuestion = pev + 1;
        if (nextQuestion === questionArray.length) {
          setQuestionAvailable(false);
          clearInterval(questionTimer);
          pRef.current.innerText = "Marks";
        }
        return nextQuestion;
      });
      setTime(0);
    }, 10000);
    return () => clearInterval(questionTimer);
  }, [questionArray]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questionNumber]);

  return (
    <div className="app">
      {loading && questionAvailable && (
        <Question
          key={questionNumber}
          number={questionNumber}
          question={questionArray[questionNumber]}
          setMarks={setMarks}
        />
      )}
      {loading && questionAvailable && <h3>{10 - time}</h3>}
      <p ref={pRef}>Time Remaining</p>
      <h3
        style={{
          color: "blue",
          fontWeight: "bolder",
          textAlign: "center",
          fontSize: "48px",
        }}
      >
        {" "}
        {!questionAvailable && marks}
      </h3>
    </div>
  );
}

export default App;
