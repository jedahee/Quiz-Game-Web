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
    var $final_panel = document.querySelector(".final_panel");
    var $img_defeat = document.querySelector(".img-defeat");
    var $img_win = document.querySelector(".img-win");
    var $name_tec = document.querySelector(".name_tec");
    var $final_phrase = document.querySelector(".final_panel > p");
    var $restart_btn = document.querySelector(".restart_btn");

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
  
    let $responses = document.querySelectorAll(".category_cont > .response");

    $responses.forEach($res => {
      $res.onclick = function (e) { return setCategory(this, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $current_no, $api_container_responses, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase, $total_no) };
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
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
    }
    
    $medium.onclick = function (e) {
      LIMIT = 15;
      LIFE = 4;
      $life.textContent = LIFE;
      $total_no.textContent = LIMIT;
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
    };
    
    $hard.onclick = function (e) {
      LIMIT = 20;
      LIFE = 3;
      $life.textContent = LIFE;
      $total_no.textContent = LIMIT;
      return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
    };

    $restart_btn.onclick = function(e) {
      return restartGame($img_defeat, $img_win, $final_panel, $diff_phrase, $diff_cont, $word_to_resolve, $word_to_resolve_cat, $easy, $medium, $hard, $total_no, $life, $title, $header, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $no_questions_container, $current_no, $api_container_responses, $final_phrase, $name_tec)
    }
}

// FUNCTIONS

function move_div_around_cursor(e) {
    let div_around_cursor = document.querySelector(".div_around_cursor");
    div_around_cursor.style.top = e.clientY + "px";
    div_around_cursor.style.left = e.clientX + "px";
}

function setDifficult($this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont) {
  console.log("A!");
  DIFFICULT = $this.classList[1];
  $word_to_resolve.textContent = DIFFICULT;
  $this.classList.add("success");
  $hard.style.pointerEvents = "none";
  $medium.style.pointerEvents = "none";
  $easy.style.pointerEvents = "none";
  $diff_phrase.classList.add("small");
  $diff_cont.classList.add("hidden");
  $category_cont.style.display="grid";

  setTimeout((e) => {
    $title.classList.add("hidden");
  }, TIME_BETWEEN_ANIMATIONS);

  setTimeout((e) => {
    $diff_cont.style.display = "none";
    $header.style.height = "0px";
    $category_phrase.classList.remove("d-none");
    $category_cont.classList.remove("hidden");
    $responses.forEach($res => {
      $res.classList.remove("hidden");
    });

  }, 700);
  
}

function restartGame($img_defeat, $img_win, $final_panel, $diff_phrase, $diff_cont, $word_to_resolve, $word_to_resolve_cat, $easy, $medium, $hard, $total_no, $life, $title, $header, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $no_questions_container, $current_no, $api_container_responses, $final_phrase, $name_tec) {
  CATEGORY = "";
  DIFFICULT = "";
  $word_to_resolve.textContent = DIFFICULT;
  $word_to_resolve_cat.textContent = CATEGORY;
  QUESTIONS = [];
  LIFE = 5;
  CURRENT_QUESTION = 0;
  LIMIT = 0;
  $img_defeat.classList.add("hidden");
  $img_win.classList.add("hidden");
  $final_panel.classList.add("hidden");
  $diff_phrase.classList.remove("d-none");
  $diff_cont.style.display = "grid";
  $easy.style.pointerEvents = "auto";
  $medium.style.pointerEvents = "auto";
  $hard.style.pointerEvents = "auto";
  $easy.classList.remove("success");
  $medium.classList.remove("success");
  $hard.classList.remove("success");

  $category_cont.innerHTML="";
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
    $res.classList.remove("success");
    $res.onclick = function (e) { return setCategory(this, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $current_no, $api_container_responses, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase, $total_no) };
  });

  $easy.onclick = function (e) {
    LIMIT = 10;
    $total_no.textContent = LIMIT;
    return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
  }
  
  $medium.onclick = function (e) {
    LIMIT = 15;
    LIFE = 4;
    $life.textContent = LIFE;
    $total_no.textContent = LIMIT;
    return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
  };
  
  $hard.onclick = function (e) {
    LIMIT = 20;
    LIFE = 3;
    $life.textContent = LIFE;
    $total_no.textContent = LIMIT;
    return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses, $category_cont); 
  };

  setTimeout((e)=> {
    $diff_cont.classList.remove("hidden");  
  }, 700);

  
}

function setCategory($this, $category_cont, $word_to_resolve_cat, $category_phrase, $heart_container, $api_phrase, $api_container, $current_no, $api_container_responses, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase, $total_no) {
  CATEGORY = $this.textContent;
  $word_to_resolve_cat.textContent = CATEGORY;
  $this.classList.add("success");
  $category_phrase.classList.add("small");
  $category_cont.classList.add("hidden");
  $api_phrase.classList.remove("hidden");

  // Async/Await getting quizzes
  allQuestions(LIMIT).then(json => {
    QUESTIONS = json;
    console.log(QUESTIONS);
    $total_no.textContent = QUESTIONS.length;
    $api_phrase.textContent = QUESTIONS[CURRENT_QUESTION].question;
    
    let answers = QUESTIONS[CURRENT_QUESTION].answers;
    
    $api_container.innerHTML="";
    Object.keys(answers).forEach(answer => {
      if (answers[answer] != null) {
        let p = document.createElement("p");
        p.textContent = answers[answer];
        p.classList.add("response");
        p.onclick = function(e) {
          return checkResponse(this, $api_container, $current_no, answer, QUESTIONS[CURRENT_QUESTION], $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase);
        };
        $api_container.appendChild(p);
      }
    });
    $api_container.classList.remove("hidden");
    
    $category_cont.style.display = "none";
    $heart_container.classList.remove("hidden");
    $no_questions_container.classList.remove("hidden");
    $life.textContent = LIFE;
    
  });
  
}

function checkResponse($this, $api_container, $current_no, answer, question, $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase) {
  let ca = question.correct_answers;
  let keys_ca = Object.keys(question.correct_answers);
  var name_correct = "";

  keys_ca.forEach(ca_item => {
    if(ca[ca_item] == "true") {
      name_correct = ca_item;
    }
  })
  
  console.log(answer);
  if (name_correct.split("_")[1] == answer.split("_")[1]) {
    $this.classList.add("success");
    CURRENT_QUESTION++;
  } else {
    if (LIFE > 1) {
      LIFE--;
      $life.textContent = LIFE;
      CURRENT_QUESTION++;
    } else {
      LIFE--;
      $life.textContent = LIFE;
      CURRENT_QUESTION = 0;
      $no_questions_container.classList.add("hidden");
      $current_no.textContent = CURRENT_QUESTION;
      
      $api_phrase.classList.add("hidden");
      $heart_container.classList.add("hidden");
      $api_container.classList.add("hidden");
      $diff_phrase.classList.add("d-none");
      $category_phrase.classList.add("d-none");
      $final_phrase.innerHTML = "Sorry, <span class='name_tec'>Laravel</span> is not for you yet 😪";
      document.querySelector(".name_tec").textContent = CATEGORY;

      $img_defeat.classList.remove("hidden");
      setTimeout((e)=>{
        $final_panel.classList.remove("hidden");
      }, 850);
      
    }
    
    
    $this.classList.add("error");
  }

  if (LIFE > 0) {

    if (CURRENT_QUESTION >= LIMIT) {
      $life.textContent = 0;
      $no_questions_container.classList.add("hidden");
      $current_no.textContent = CURRENT_QUESTION;
      
      $api_phrase.classList.add("hidden");
      $heart_container.classList.add("hidden");
      $api_container.classList.add("hidden");
      $diff_phrase.classList.add("d-none");
      $category_phrase.classList.add("d-none");
      $final_phrase.innerHTML = "Congratulations! You master <span class='name_tec'>Laravel</span> at a <span class='name_difficult'>Laravel</span> level 🎉";
      document.querySelector(".name_tec").textContent = CATEGORY;
      document.querySelector(".name_difficult").textContent = DIFFICULT;

      $img_win.classList.remove("hidden");
      setTimeout((e)=>{
        $final_panel.classList.remove("hidden");
      }, 850);
    }

    setTimeout((e) => {
      $api_phrase.classList.add("hidden");
      $api_container.classList.add("hidden");
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
          p.onclick = function(e) {
            return checkResponse(this, $api_container, $current_no, answer, QUESTIONS[CURRENT_QUESTION], $api_phrase, $api_container_responses, QUESTIONS, $api_container, $life, $final_panel, $no_questions_container, $heart_container, $diff_phrase, $name_tec, $img_defeat, $img_win, $final_phrase, $category_phrase);
          };
          
          $api_container.appendChild(p);
        }
      });

      $api_phrase.classList.remove("hidden");
      $api_container.classList.remove("hidden");
    
    }, 650);
    console.log(CURRENT_QUESTION);
  }
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