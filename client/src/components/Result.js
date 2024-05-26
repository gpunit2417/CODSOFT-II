import React, { useEffect, useState } from 'react';

export default function Result() {
  const [result, setResult] = useState({ score: 0, total: 0 });

  useEffect(() => {
    const storedResult = JSON.parse(localStorage.getItem('quizResult'));
    if (storedResult) {
      setResult(storedResult);
    }
  }, []);

  return (
    <div style={{margin: '100px 0 64px 0', width: '50vw', display: 'inline-block', backgroundColor: 'lightgray'}} className='card'>
      <h1 style={{margin: '30px 0 40px 0', fontFamily: 'cursive'}}>Quiz Result</h1>
      <h2 style={{fontFamily: 'cursive'}}>Your Score: {result.score} out of {result.total}</h2>
      <h1 style={{fontFamily: 'cursive', margin: '30px 0 30px 0'}}>Thanks for Playing this Quiz&nbsp;<i>!!!</i></h1>
      <h4 style={{fontFamily: 'cursive', margin: '30px 0 30px 0'}}>Wanna play again. Click the button below</h4>
      <a href='/' className='btn btn-primary' style={{margin: '0 0 20px 0'}}>Home</a>
    </div>
  );
}
