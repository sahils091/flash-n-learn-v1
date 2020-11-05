
import { useState } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  return (
    <div className="App">
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
