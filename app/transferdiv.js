document.addEventListener("DOMContentLoaded", function () {
    const btnfilter = document.querySelector(".btnfilter");
    const itemsLeftContainer = document.querySelector(".itemsleft");
  
    const moveBtnfilterContainer = () => {
      if (window.innerWidth >= 768) {
        itemsLeftContainer.insertBefore(btnfilter, itemsLeftContainer.lastElementChild);
      } else {
        document.querySelector(".bottom").appendChild(btnfilter);
      }
    };
  
    moveBtnfilterContainer(); // Appel initial pour positionner correctement selon la largeur de l'écran
  
    window.addEventListener("resize", moveBtnfilterContainer); 
  });