import React from "react";
import Data from "../data.js"
export default function QuizPage(){
  //Page state
  const [pageState,setpageState] = React.useState(false)
  //State for fetched data
  const [data, setdata] = React.useState([]);

  //Fetching data from
  function FetchData(){
  fetch('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy').then(res=>res.json()).then(result=>{
    // console.log(result.results);
    setdata(prevarr =>{
      return result;
    })

    })
  }

  React.useEffect(()=>{
    FetchData();
  },[pageState])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }

  }

  //State for answer list
  const [answerList, setanswerList] = React.useState([]);

  //State for options button style
  const [isClicked,setisClicked] = React.useState(Data);

  //Id and value of selected answers
  const [selectedData, setselectedData] = React.useState([{
    id:"-1",
    value:"-1"
  }]);

  //Button display state
  const [buttonDisplay, setbuttonDisplay] = React.useState("none");
  function quizClick(event,index){

      //Displaying check button
      setbuttonDisplay("block");


      //Pushing id and value to the State
      setselectedData(arr=>{
          let isThere = false;
          for(let i =0; i < arr.length; i++){
            if(event.target.id == arr[i].id){
              isThere = true;
            }

          }

          if(isThere == false){
            return([...arr,{
              id:[event.target.id],
              value:[event.target.innerHTML]
            }])
          }
          else{
            return(arr.filter(testobj => testobj.id != event.target.id))
          }

      })

      //Other part
      setisClicked(prevarr=>{
        return prevarr.map(secondArr=>{
          return secondArr.map(obj=>{
            if(obj.id == event.target.id){
              let value = event.target.innerHTML;
              setanswerList(oldArray=> {
                if(oldArray.indexOf(value) >= 0){
                    const newArray = oldArray.filter(item => item != value);
                    return [...newArray];
                }
                else{
                  return [...oldArray,value];
                }

              });
              return({
                ...obj,
                checked:!obj.checked,
                background:`${obj.checked?"transparent":"#D6DBF5"}`,
                border:`${obj.checked?"1px #4D5B9E solid":"none"}`
              })
            }
            else{

              if(prevarr.indexOf(secondArr) == index){
                return({
                  ...obj,
                  cursor:`${obj.cursor == "pointer"?"not-allowed":"pointer"}`,
                  pointerEvents:`${obj.pointerEvents == "auto"?"none":"auto"}`
                })
              }
              else{
                return({
                ...obj,
                })
              }
            }
          })
        })
      })
    }


  const Elements = data.map((num,index)=>{
    let array = num.incorrectAnswers;
    array.push(num.correctAnswer);

    return(
      <div className="quiz-box">
            <h1>{num.question}</h1>
            <button className="first-quizbox" style = {{background:`${isClicked[index][0].background}`, border:`${isClicked[index][0].border}`,cursor:`${isClicked[index][0].cursor}`,pointerEvents:`${isClicked[index][0].pointerEvents}`}}  onClick={(e)=>{quizClick(e,index);}} id={index+10} >{array[0]}</button>
            <button style = {{background:`${isClicked[index][1].background}`, border:`${isClicked[index][1].border}`,cursor:`${isClicked[index][1].cursor}`,pointerEvents:`${isClicked[index][1].pointerEvents}` }} onClick={(e)=>{quizClick(e,index);}} id={index+20} >{array[1]}</button>
            <button style = {{background:`${isClicked[index][2].background}`, border:`${isClicked[index][2].border}`,cursor:`${isClicked[index][2].cursor}`,pointerEvents:`${isClicked[index][2].pointerEvents}` }} onClick={(e)=>{quizClick(e,index);}} id={index+30} >{array[2]}</button>
            <button style = {{background:`${isClicked[index][3].background}`, border:`${isClicked[index][3].border}` ,cursor:`${isClicked[index][3].cursor}`,pointerEvents:`${isClicked[index][3].pointerEvents}`}} onClick={(e)=>{quizClick(e,index);}} id={index+40} >{array[3]}</button>
            <hr/>

      </div>
    )});

  const [rightAns, setrightAns] = React.useState(0);

  //Button text State
  const [buttonText,setbuttonText] = React.useState("Check answers");

  //State for span
  const[spanState,setspanState] = React.useState("none");

  //Check answer if they are correct
  function checkAnswer(){
    //Changing buttonText and displaying Right answer count
    if(buttonText == "Check answers"){
      setbuttonText("Play again");
      setspanState("block");
      const AllAnswers = [];
      data.map(obj=>{
        AllAnswers.push(obj.correctAnswer);

      })

      for(let i =0; i < answerList.length;i++){
        AllAnswers.map(num=>{
          if(answerList[i] == num){
            setrightAns(value=> value+1);
          }
        })
      }

      //Making the right options green and wrong options red
      selectedData.map(obj=>{
        if(obj.id != -1){
          setisClicked(prevarr=>{
            return prevarr.map(secondArr=>{
              return secondArr.map(dataobj=>{
                if(dataobj.id == obj.id){
                  let setGreen = false;
                  //Checking if the sected answer is the right answer
                  for(let k =0; k < AllAnswers.length; k++){

                    if(obj.value[0] == AllAnswers[k]){
                      setGreen = true;
                    }
                  }
                  const ColorData = setGreen?"#94D7A2":"#F8BCBC";
                  return({
                    ...dataobj,
                    background:`${ColorData}`,
                    border:"none"
                  })
                }
                else{
                  return({
                    ...dataobj
                  })
                }
              })
            })
          })
        }
      })
    }
    else{
      setspanState("none");
      setbuttonText("Check answers");
      setbuttonDisplay("none");


      //Resetting states
      setrightAns(0);
      setselectedData([{id:"-1",value:"-1"}]);
      setisClicked(Data);
      setanswerList([]);
      setpageState(value=>!value);
    }
  }


  return(
    <div className="quiz-container">
        <div className="quiz-box">
          {Elements}
        </div>

        <div className="lower-container">
          <span style={{display:`${spanState}`}} >You scored {rightAns}/5 correct answers</span>
          <button className="quiz-button" style={{display:`${buttonDisplay}`}} onClick={checkAnswer}>{buttonText}</button>
        </div>

    </div>
  );


}
