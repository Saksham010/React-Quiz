import React from "react";

export default function Landing(props){
  return(
    <div className="outer-container-landing">


      <h1>Quizzical </h1>
      <p>Welcome to my quizz app</p>
      <button onClick={props.myfunc}>Start quiz</button>


    </div>
  );
}
