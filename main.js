// GLOBAL VARS
const API_KEY = "0bb97yZcB9Y17RbJZFQA1jrfEq2OtZab6YJybOug";
var DIFFICULT = "";
var TIME_BETWEEN_ANIMATIONS = 50;
var CATEGORIES = ["linux", "bash", "PHP", "docker", "HTML", "mySql", "wordPress", "laravel", "kubernetes", "javaScript", "devOps"];
var CATEGORY = "";
var QUESTIONS = [];
var LIFE = 5;
var CURRENT_QUESTION = 0;
var LIMIT = 0;

window.onload = function(e) {
    // Background animation
    Particles.init({
      selector: ".background",
      sizeVariations: 3,
      color: ["#FEFEFE"],
      connectParticles: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 65,
            connectParticles: true,
          },
        },
        {
            breakpoint: 550,
            options: {
              maxParticles: 45,
              connectParticles: true,
            },
          },
        {
          breakpoint: 425,
          options: {
            maxParticles: 120,
            connectParticles: false,
          },
        },
        {
          breakpoint: 320,
          options: {
            maxParticles: 0,
            // disables particles.js
          },
        },
      ],
    });

    // DOM VARS
    var $body = document.querySelector(".body");
    var $header = document.querySelector(".header");
    var $easy = document.querySelector(".easy");
    var $medium = document.querySelector(".medium");
    var $hard = document.querySelector(".hard");
    var $word_to_resolve = document.querySelector(".diff_phrase > .word_to_resolve");
    var $word_to_resolve_cat = document.querySelector(".category_phrase > .word_to_resolve");
    var $title = document.querySelector(".title");
    var $diff_phrase = document.querySelector(".diff_phrase");
    var $diff_cont = document.querySelector(".diff_cont");
    var $category_phrase = document.querySelector(".category_phrase");
    var $category_cont = document.querySelector(".category_cont");
    var $heart_container = document.querySelector(".heart-container");
    var $life = document.querySelector(".life");
    var $api_phrase = document.querySelector(".api_phrase");
    var $api_container = document.querySelector(".api_container");
    var $api_container_responses = document.querySelectorAll(".api_container > .response");
    var $no_questions_container = document.querySelector(".no-questions-container");
    var $current_no = document.querySelector(".current-no");
    var $total_no = document.querySelector(".total-no");

    // Fill HTML elements
    $life.textContent = LIFE;
    $current_no.textContent = CURRENT_QUESTION;
    $total_no.textContent = LIMIT;

    CATEGORIES.forEach(cat => {
      let first_letter = cat.charAt(0).toUpperCase();
      cat = cat.substring(1, cat.length)
      cat = first_letter + cat;

      let p = document.createElement("p");
      p.classList.add("response");
      p.classList.add("hidden");
      p.textContent = cat;
      $category_cont.appendChild(p);
    });
  
    var $responses = document.querySelectorAll(".category_cont > .response");

    $responses.forEach($res => {
      $res.onclick = function (e) { return setCategory(this, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $no_questions_container, $current_no, $api_container_responses, $life) };
    });
    // Cursor animation
    let div_around_cursor = document.createElement("div");
    div_around_cursor.classList.add("div_around_cursor");

    $body.appendChild(div_around_cursor);

    // Events
    document.onmousemove = move_div_around_cursor;
    $easy.onclick = function (e) {
      LIMIT = 10;
      $total_no.textContent = LIMIT;
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); 
    }
    
    $medium.onclick = function (e) {
      LIMIT = 15;
      LIFE = 4;
      $life.textContent = LIFE;
      $total_no.textContent = LIMIT;
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); 
    };
    
    $hard.onclick = function (e) {
      LIMIT = 20;
      LIFE = 3;
      $life.textContent = LIFE;
      $total_no.textContent = LIMIT;
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); 
    };
}

// FUNCTIONS

function move_div_around_cursor(e) {
    let div_around_cursor = document.querySelector(".div_around_cursor");
    div_around_cursor.style.top = e.clientY + "px";
    div_around_cursor.style.left = e.clientX + "px";
}

function setDifficult($this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses) {
  DIFFICULT = $this.classList[1];
  $word_to_resolve.textContent = DIFFICULT;
  $this.classList.add("success");
  $hard.style.pointerEvents = "none";
  $medium.style.pointerEvents = "none";
  $easy.style.pointerEvents = "none";
  $diff_phrase.classList.add("small");
  $diff_cont.classList.add("hidden");

  setInterval((e) => {
    $title.classList.add("hidden");
  }, TIME_BETWEEN_ANIMATIONS);

  setInterval((e) => {
    $diff_cont.style.display = "none";
    $header.style.height = "0px";
    $category_phrase.classList.remove("d-none");
    $responses.forEach($res => {
      $res.classList.remove("hidden");
    });

  }, 700);
  
}

function setCategory($this, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $no_questions_container, $current_no, $api_container_responses, $life) {
  CATEGORY = $this.textContent;
  $word_to_resolve_cat.textContent = CATEGORY;
  $this.classList.add("success");
  $category_phrase.classList.add("small");
  $category_cont.classList.add("hidden");
  $api_phrase.classList.remove("hidden");

  // Async/Await getting quizzes
  allQuestions(LIMIT).then(json => {
    QUESTIONS = json;
    console.log(json);
    $api_phrase.textContent = QUESTIONS[CURRENT_QUESTION].question;
    
    let answers = QUESTIONS[CURRENT_QUESTION].answers;

    Object.keys(answers).forEach(answer => {
      if (answers[answer] != null) {
        let p = document.createElement("p");
        p.textContent = answers[answer];
        p.classList.add("response");
        p.onclick = function(e) {
          return checkResponse(this, $api_container, $current_no, answer, QUESTIONS[CURRENT_QUESTION], $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life);
        };
        $api_container.appendChild(p);
      }
    });

    $category_cont.style.display = "none";
    $heart_container.classList.remove("hidden");
    $no_questions_container.classList.remove("hidden");

    
  })
  
}

function checkResponse($this, $api_container, $current_no, answer, question, $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life) {
  let res = (question.correct_answers[answer+"_correct"] === 'true');
  
  if (res === true) {
    $this.classList.add("success");
  } else {
    if (LIFE > 0) {
      LIFE--;
      $life.textContent = LIFE;
    }
    
    $this.classList.add("error");
  }

  setTimeout((e) => {
    $api_phrase.classList.add("hidden");
    document.querySelector(".answer_container.api_container").classList.add("hidden");
    CURRENT_QUESTION++;
    $current_no.textContent = CURRENT_QUESTION;
    
  }, 150);


  setTimeout((e) => {
    $api_phrase.textContent = QUESTIONS[CURRENT_QUESTION].question;
    let answers = QUESTIONS[CURRENT_QUESTION].answers;
    $api_container.innerHTML = "";
    Object.keys(answers).forEach(answer => {
      if (answers[answer] != null) {
        let p = document.createElement("p");
        p.textContent = answers[answer];
        p.classList.add("response");
        
        $api_container.appendChild(p);
      }
    });
    document.querySelectorAll(".api_container > .response").forEach(p => {
      p.onclick = function(e) {
        return checkResponse(this, $api_container, $current_no, answer, QUESTIONS[CURRENT_QUESTION], $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life);
      };
    });
    $api_phrase.classList.remove("hidden");
    document.querySelector(".answer_container.api_container").classList.remove("hidden");
  
  }, 650);  
}

async function allQuestions(LIMIT) {
      // Solicitud GET (Request) from a quiz.
      var response = await fetch('https://quizapi.io/api/v1/questions?difficult='+DIFFICULT+'&limit='+ LIMIT +'&tags=' + CATEGORY, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY,
        },
        
      })
      
      let result = await response.json();
      return result;
}