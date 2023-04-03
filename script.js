const spinBtn = document.querySelector("#spin");
const container = document.querySelector(".container");

function spin() {
  const deg = Math.floor(Math.random() * 2000) + 1000;
  container.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    const allDivs = document.querySelectorAll(".container div");
    let winnerIndex = null;
    allDivs.forEach((div, index) => {
      const rect = div.getBoundingClientRect();
      if (
        rect.x + rect.width / 2 > container.clientWidth / 2 &&
        rect.y + rect.height / 2 > container.clientHeight / 2
      ) {
        winnerIndex = index + 1;
      }
    });

    alert(`Winner is section ${winnerIndex}`);
    container.style.transform = "none";
  }, 5000);
}

spinBtn.addEventListener("click", spin);
