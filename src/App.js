import { useEffect, useRef, useState } from "react";
import "./App.css";
import FlashcardList from "./FlashcardList";
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEL = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.get("https://opentdb.com/api.php",{
      params:{
        amount: amountEL.current.value,
        category: categoryEl.current.value
      }
    }).then((res) => {
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

export default App;
