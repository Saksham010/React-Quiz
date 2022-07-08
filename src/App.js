import './App.css';
import Landing from './components/Landing.js';
import QuizPage from './components/quizpage.js';
import React from "react";

function App() {

  const [Mainpage, setMainpage] =  React.useState(false);


  function handleClick(){
    setMainpage(value=> !value);
  }

  return (
    <div className="App">
      {!Mainpage && <Landing myfunc={handleClick}/> || Mainpage && <QuizPage />}
    </div>
  );
}

export default App;
