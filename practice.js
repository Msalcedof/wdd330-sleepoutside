const countdownDislay = document.getElementById("countDown");
const startButton = document.getElementById("startButton");

let timeLeft = 10;

startButton.addEventListener("click",() => {
    setInterval(() =>{
        if (timeLeft >= 0 ){
            countdownDislay.textContent = timeLeft;
            timeLeft--;
        } else{

        }

    }, 1000)
})
