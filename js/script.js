//selecting all required elements

const info_box = document.querySelector(".info_box");
const start_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const highscore_box=document.querySelector(".highscore_box")

const bottom_ques_counter = document.querySelector("footer .total_que");
info_box.classList.add("activeInfo"); //show info box




// if start button button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz");
    highscore_box.classList.remove("activeHighScore") 
    showQuetions(0); //calling showQestions function
    startTimer(15); //calling startTimer function
}


let inputname=""
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;


const quit_quiz = result_box.querySelector(".highscore .quit");



// if quitQuiz button clicked
function quit (){
    window.location.reload(); //reload the current window
}

function submit (){
    var input = document.getElementById("fname").value;
 
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.remove("activeResult"); //show result box
    highscore_box.classList.add("activeHighScore") 
    const scoreTexthigh = highscore_box.querySelector(".highscore");
    inputname=document.getElementById("fname");
    console.log(inputname)
    let high="<div> 1 " +input + " : " +userScore;
    
    scoreTexthigh.innerHTML = high;
    
    
}


// if Next Que button clicked
function next(){
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        clearInterval(counter); //clear counter
        startTimer(timeValue); //calling startTimer function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
       
       
    }else{
        clearInterval(counter); //clear counter

        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<button class="option"><span>'+ questions[index].options[0] +'</button></div>'
    + '<button class="option"><span>'+ questions[index].options[1] +'</button></div>'
    + '<button class="option"><span>'+ questions[index].options[2] +'</button></div>'
    + '<button class="option"><span>'+ questions[index].options[3] +'</button></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter

    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array

    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        bottom_ques_counter.innerHTML = "Correct!";
        bottom_ques_counter.style.color = "green";
        next();
        //adding tick icon to correct selected option

    }else{
        bottom_ques_counter.innerHTML = "InCorrect!";
        bottom_ques_counter.style.color = "red";
        next();


    }

}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    highscore_box.classList.remove("activeHighScore") 
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag= '<h1>All Done!</h1> <br> <p> Your score is ' + userScore +'';
    
    scoreText.innerHTML = scoreTag;
    
}




function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 0){next();
        }
    }
}


