import { useEffect, useRef, useState } from "react";
import "./App.css";
import FlashcardList from "./FlashcardList";
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEL = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index} -${Date.now}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {" "}
                  {category.name}{" "}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEL}
          />
        </div>

        <div className="form-group">
          <button className="btn"> Generate </button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashCards={flashCards} />
      </div>
    </>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2+2",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "what is 4+2",
    answer: "4",
    options: ["6", "3", "4", "5"],
  },
];
export default App;
