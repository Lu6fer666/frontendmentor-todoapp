const themeToggle = document.querySelector(".theme__toggle");
const body = document.body;
const addTodo = document.querySelector(".addTodo__addNew");
const containerCard = document.querySelector(".container__card");
const bottom = document.querySelector(".bottom");

themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  addTodo.classList.toggle("dark-mode");
  containerCard.classList.toggle("dark-mode");
  bottom.classList.toggle("dark-mode");
});