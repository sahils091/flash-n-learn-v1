
import { useEffect, useState } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);


  useEffect(()=>{
    axios.get("https://opentdb.com/api.php?amount=10")
    .then(res=> {
     setFlashCards(res.data.results.map((questionItem, index) => {
       const answer = decodeString(questionItem.correct_answer);
       const options = [...questionItem.incorrect_answers.map(a => decodeString(a)),
         answer]
       return {
         id: `${index} -${Date.now}`,
         question: decodeString(questionItem.question),
         answer: answer,
         options:options.sort(() => Math.random() - 0.5)
       }
     })
    )})
  },[])

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str
    return textArea.value
  }
  return (
    <div className="container">
    <FlashcardList flashCards={flashCards}/>  
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2+2",
    answer: "4",
    options: [
      "2",
      "3",
      "4",
      "5"
    ]
  },
  {
    id: 2,
    question: "what is 4+2",
    answer: "4",
    options: [
      "6",
      "3",
      "4",
      "5"
    ]
  }

]
export default App;
