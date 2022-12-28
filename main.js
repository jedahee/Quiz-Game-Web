// GLOBAL VARS
const API_KEY = "0bb97yZcB9Y17RbJZFQA1jrfEq2OtZab6YJybOug";
var DIFFICULT = "";
var TIME_BETWEEN_ANIMATIONS = 50;
var CATEGORIES = ["linux", "bash", "PHP", "docker", "HTML", "mySql", "wordPress", "laravel", "kubernetes", "javaScript", "devOps"];
var CATEGORY = "";
var QUESTIONS = [];

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
            maxParticles: 85,
            connectParticles: true,
          },
        },
        {
            breakpoint: 550,
            options: {
              maxParticles: 55,
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

    // Fill categories container HTML
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
      $res.onclick = function (e) { return setCategory(this, $category_cont, $word_to_resolve_cat, $category_phrase) };
    });
    // Cursor animation
    let div_around_cursor = document.createElement("div");
    div_around_cursor.classList.add("div_around_cursor");

    $body.appendChild(div_around_cursor);

    // Events
    document.onmousemove = move_div_around_cursor;
    $easy.onclick = function (e) {return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); }
    $medium.onclick = function (e) {return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); };
    $hard.onclick = function (e) {return setDifficult(this, $hard, $medium, $easy, $word_to_resolve, $title, $header, $diff_phrase, $diff_cont, $category_phrase, $responses); };
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

function setCategory($this, $category_cont, $word_to_resolve_cat, $category_phrase) {
  CATEGORY = $this.textContent;
  QUESTIONS = allQuestions()
  $word_to_resolve_cat.textContent = CATEGORY;
  $this.classList.add("success");
  $category_phrase.classList.add("small");
  $category_cont.classList.add("hidden");

  setInterval((e) => {
    $category_cont.style.display = "none";

  }, 700);
  
}

function allQuestions() {
      // Solicitud GET (Request) from a quiz.
      fetch('https://quizapi.io/api/v1/questions?difficult='+DIFFICULT+'&limit=10&tags=' + CATEGORY, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY,
        },
        
      }).then(response => response.json())  // convertir a json
      .then(json => {console.log(json) })    //imprimir los datos en la consola
      .catch(err => console.log('Solicitud fallida', err)); // Capturar errores */
}