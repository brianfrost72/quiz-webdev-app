const questions = [
  {
    question: "Apa fungsi dari element HTML <p>",
    option1: "Menentukan gaya CSS untuk elemen.",
    option2: "Membuat dan menginialisasi objek.",
    option3: "mengelola koneksi database.",
    option4: "menampilkan teks paragraf.",
    answer: "menampilkan teks paragraf.",
  },
  {
    question: "kata kunci apa yang digunakan untuk membuat judul di HTML?",
    option1: "this",
    option2: "new",
    option3: "create",
    option4: "h1",
    answer: "h1",
  },
  {
    question:
      "Apa yang dimaksud dengan kata kunci 'src' dalam elemen <img> di HTML?",
    option1: "sumber gambar",
    option2: "object prototype dari konstruktor",
    option3: "Alamat URL saat ini",
    option4: "Kata kunci yang sudah dipesan tanpa makna khusus",
    answer: "sumber gambar",
  },
  {
    question: "Apa tujuan dari atribut 'href' dalam elemen <a> di HTML?",
    option1: "mendefinisikan nama konstruktor",
    option2: "menympan data pribadi untuk objek",
    option3: "menambah metode dan properti ke semua instansi objek",
    option4: "menentukan URL tujuan tautan.",
    answer: "Menentukan URL tujuan tautan.",
  },
  {
    question:
      "Bagaimana cara menambahkan warna latar belakang pada elemen HTML?",
    option1: "Menggunakan notasi 'dot' contohnya object.property",
    option2: "Dengan memanggil fungsi terpisah dengan nama properti",
    option3:
      "Dengan menggunakan atribut 'style' dan properti 'background-color'.",
    option4: "Dengan menggunakan properti 'this' dalam metode objek.",
    answer:
      "Dengan menggunakan atribut 'style' dan properti 'background-color'.",
  },
];

// Elemen DOM
const startBtn = document.querySelector(".startBtn");
const login_form = document.querySelector(".login_form");
const emailPass = document.querySelector(".emailPass");
const hideBtn = document.querySelector(".hideBtn");
const userEmail = document.getElementById("uEmail");
const userPass = document.getElementById("uPass");
const infoBox = document.querySelector(".info_box");
const quizStart = document.querySelector(".quiz_container");
const resultbox = document.querySelector(".result_box");
const scoreText = document.querySelector(".score_text");
const inputs = document.querySelectorAll(".inputs");
const links = document.querySelectorAll(".links");
const progressbar = document.querySelector(".progressBar");
const form = document.getElementById("form");
const countDown = document.getElementById("timer");

// logika
let index = 0; // Question Counting
let score = 0; // User correct question score
let counter; // counter of timer
let timeValue = 60; // timer value

// Registration Form
const signUpName = document.getElementById("sName");
const signUpEmail = document.getElementById("sEmail");
const signUpPass = document.getElementById("sPass");

function submitForm() {
  event.preventDefault();
  const registerUser = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPass.value,
  };

  localStorage.setItem("registerUser", JSON.stringify(registerUser));
  window.location.href = "index.html";
}

// get data user to local storage

let getUserData = localStorage.getItem("registerUser");
getUserData = JSON.parse(getUserData || "{}");

// Login Form
const getEmail = getUserData.email;
const getPassword = getUserData.password;

function loginForm() {
  const user = localStorage.getItem("registerUser");
  if (!user) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: true,
    });
    Toast.fire({
      title:
        "<h2>Selamat Datang di Quiz Web App</h2> Silahkan daftarkan akun anda",
    });
  } else {
    if (userEmail.value == getEmail && userPass.value == getPassword) {
      infoBox.style.display = "block";
      login_form.style.display = "none";
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login Berhasil",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: true,
        timer: 1000,
      });
      Toast.fire({
        icon: "error",
        title: "Email atau Password Salah",
      });
    }
  }
}

// quit quiz
function quit() {
  location.reload();
}

// enter quiz
function enterQuiz() {
  infoBox.style.display = "none";
  startBtn.style.display = "block";
}

// tampilkan pertanyaan
function renderQuestions() {
  const question = document.getElementById("qustionsContainer");
  const options = document.getElementsByName("options");
  const qustionNo = document.getElementById("qustionNo");
  clearInterval(counter);
  startTimer(timeValue);

  // looping
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value == questions[index - 1].answer) {
        score++;
      }
    }
  }

  const percentage = (score / 5) * 100;
  window.addEventListener("blur", () => {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";
    if (score === 0) {
      scoreText.innerHTML = `<span style="text-align: center; margin: 5px 0; font-size: 22px">Anda dilarang untuk keluar dari aplikasi Quiz, anda didiskualifikasi</span>`;
    } else {
      const progressBar = document.querySelector(".progressBar");
      if (progressBar) {
        progressBar.innerHTML = `<p>${percentage}%</p>`;
      }
      scoreText.innerHTML = `<span>Score: <p>${score}</p> out of <p>${
        options.length + 1
      }</p></span>`;
    }
  });

  if (!questions[index]) {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";

    scoreText.innerHTML = `<span> <p>${score}</p> out of <p>${
      options.length + 1
    }</p></span>`;

    const circlularProgress = document.querySelector(".circular-progress");
    progressValue = document.querySelector(".progress-value");

    let progressStartValue = 0;
    (progressEndValue = percentage), (speed = 25);

    const progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circlularProgress.style.background = `conic-gradient(var(--primary-color) ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
    return;
  }

  const number = index + 1;

  const questionValue = questions[index];
  question.innerHTML = `
    <div id="question">
        <span>${number}</span>. 
        <p>${questionValue.question}</p>
    </div>
    <div class="option_list">
      <label for="options1" class="options"><input type="checkbox" id="options1" name="options" value="${questionValue.option1}">${questionValue.option1}<span class="checkmark"></span></label>
      <label for="options2" class="options"><input type="checkbox" id="options2" name="options" value="${questionValue.option2}">${questionValue.option2}<span class="checkmark"></span></label>
      <label for="options3" class="options"><input type="checkbox" id="options3" name="options" value="${questionValue.option3}">${questionValue.option3}<span class="checkmark"></span></label>
      <label for="options4" class="options"><input type="checkbox" id="options4" name="options" value="${questionValue.option4}">${questionValue.option4}<span class="checkmark"></span></label> 
    </div>`;

  index++;
  qustionNo.innerText = index;
}
// <<< Timer >>>
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    countDown.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      renderQuestions();
    }
  }
}

// start quiz
function startQuiz() {
  quizStart.style.display = "block";
  startBtn.style.display = "none";
  renderQuestions();
}

// set page full screen when start quiz
if (document.documentElement.requestFullscreen) {
  document.documentElement.requestFullscreen().catch((err) => {
    console.warn("Fullscreen gagal:", err);
  });
}

// Particle Background
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numParticles = 100;

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < numParticles; i++) {
  let size = Math.random() * 5 + 2;
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let speedX = (Math.random() - 0.5) * 2;
  let speedY = (Math.random() - 0.5) * 2;
  particlesArray.push(new Particle(x, y, size, speedX, speedY));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Preloader
// preloader

document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const content = document.querySelector(".content");
  const progress = document.getElementById("progress");
  const loadingText = document.querySelector(".loading-text");

  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      loadingText.textContent = "READY";

      setTimeout(() => {
        // Hide preloader with transform
        preloader.classList.add("preloader-done");

        // Show content
        content.style.display = "block";

        // Trigger reflow
        void content.offsetWidth;

        // Fade in content
        content.style.opacity = "1";

        // Remove preloader after animation
        setTimeout(() => {
          preloader.style.display = "none";
        }, 800);
      }, 600);
    } else {
      width += Math.floor(Math.random() * 5) + 1;
      width = Math.min(width, 100);
      progress.style.width = width + "%";

      if (width > 80) {
        loadingText.textContent = "ALMOST THERE";
      } else if (width > 50) {
        loadingText.textContent = "LOADING Quiz";
      }
    }
  }, 100);
});
