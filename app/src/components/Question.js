import React, { useEffect, useState } from "react";

function Question(props) {
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState("");
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    let options = [
      props.question.correct_answer,
      ...props.question.incorrect_answers,
    ];
    setCorrect(props.question.correct_answer);
    Shuffle(options);
  }, [props.question]);

  function Shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setOptions(arr);
  }
  return (
    <div>
      <h3> Question: {props.number + 1}</h3> <h1>{props.question.question}</h1>
      {options.map((option, index) => (
        <button
          disabled={isDisabled}
          onClick={(e) => {
            if (e.target.innerText === correct) {
              props.setMarks((prev) => prev + 1);
              e.target.style.backgroundColor = "Green";
            } else {
              e.target.style.backgroundColor = "red";
            }
            setisDisabled(true);
          }}
          key={index}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Question;
