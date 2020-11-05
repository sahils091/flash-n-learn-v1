import React, { useEffect, useRef, useState } from 'react';

const Flashcard = ({flashcard}) => {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');
    const frontEl = useRef();
    const backEl = useRef();

function setMaxheight() {
   const frontHeight = frontEl.current.getBoundingClientRect().height;
   const backHeight = backEl.current.getBoundingClientRect().height;
   setHeight(Math.max(frontHeight, backHeight, 100))
}

useEffect(setMaxheight, [flashcard.question,flashcard.answer, flashcard.options])
    return (
        <div 
        style={{height: height}}
        className={`card ${ flip ? "flip" : ""}`}
        onClick={()=> setFlip(!flip)}>

        <div className="front" ref={frontEl}>
            {flashcard.question}
            <div className="flashcard.options">
                {flashcard.options.map(option => {
                    return <div className="flashcard-option">{option}</div>
                })}
            </div>
        </div>
        <div className="back" ref={backEl}>
            {flashcard.answer}
        </div>
            
        </div>
    );
};

export default Flashcard;