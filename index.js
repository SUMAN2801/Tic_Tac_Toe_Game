// select all required elements
const seletBox = document.querySelector(".select-box"),
SelectXBtn = seletBox.querySelector(".playerx"),
SelectOBtn = seletBox.querySelector(".playero"),
PlayBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{
    for(let i=0;i<allBox.length;i++){
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
SelectXBtn.onclick = ()=>{
    seletBox.classList.add("hide");
    PlayBoard.classList.add("show");
}
SelectOBtn.onclick = ()=>{
    seletBox.classList.add("hide");
    PlayBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}
let playyerXIcon = "fas fa-times";
let playyerOIcon = "far fa-circle";
let playerSign = 'x';
// for user click function
function clickedBox(elements) {
    // console.log(elements);
    if(getResult() == true) {
        if(players.classList.contains("player")) {
            playerSign = 'o';
            elements.setAttribute("id",playerSign);
            elements.innerHTML = `<i class="${playyerOIcon}"></i>`
            players.classList.remove("active");
        }else {
            elements.innerHTML = `<i class="${playyerXIcon}"></i>`
            players.classList.add("active");
            playerSign = 'x'
            elements.setAttribute("id",playerSign);
        }
        if(getResult() == false)
            showResult();
        elements.style.pointerEvents = "none";
        PlayBoard.style.pointerEvents = "none"
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(()=>{
            cpu();
        },randomDelayTime);
    }else {
        showResult();
    }
}

// for cpu click funtion
function cpu() {
    if(getResult() == true){
        let arr = []
        for (let i=1;i<allBox.length;i++) {
            if (allBox[i].childElementCount == 0) {
                arr.push(i);
                // console.log(i + " " + "has no children")
            }
        }
        let randomNo = arr[Math.floor(Math.random() * (arr.length))];
        // console.log(randomNo);
        if (arr.length>0) {
            if(players.classList.contains("player")) {
                allBox[randomNo].innerHTML = `<i class="${playyerXIcon}"></i>`
                players.classList.add("active");
                playerSign = 'x'
                allBox[randomNo].setAttribute("id",playerSign);
            }else {
                allBox[randomNo].innerHTML = `<i class="${playyerOIcon}"></i>`
                players.classList.remove("active");
                playerSign = 'o'
                allBox[randomNo].setAttribute("id",playerSign);
            }
            if(getResult() == false)
                showResult();
        }
        allBox[randomNo].style.pointerEvents = "none";
        PlayBoard.style.pointerEvents = "auto";
    }else {
        showResult();
    }
}
// Now the resukt part
function getclass(idname) {
    return document.querySelector(".box" + idname).id;
}
function checkClass(val1,val2,val3,sign) {
    if (getclass(val1) == sign && getclass(val2) == sign && getclass(val3) == sign)
        return true;
}
function getResult() {
    if (checkClass(1,2,3,playerSign) || checkClass(7,8,9,playerSign)
     || checkClass(1,4,7,playerSign) || checkClass(3,6,9,playerSign)   
     || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)
     || checkClass(2,5,8,playerSign) || checkClass(4,5,6,playerSign)){
      console.log(playerSign + " " + "is the Winner");
       return false;
    }
    else {
        if(getclass(1) != "" && getclass(2) != "" && getclass(3) != "" 
        && getclass(4) != "" && getclass(5) != "" && getclass(6) != "" 
        && getclass(7) != "" && getclass(8) != "" && getclass(9) != ""){
            return false;
        }
        return true;
     }
}
function showResult() {
    if(checkClass(1,2,3,playerSign) || checkClass(7,8,9,playerSign)
    || checkClass(1,4,7,playerSign) || checkClass(3,6,9,playerSign)   
    || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)
    || checkClass(2,5,8,playerSign) || checkClass(4,5,6,playerSign)){
        setTimeout(()=>{
            PlayBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = `player <p>${playerSign}</p> won the game!`;
    }else{
        setTimeout(()=>{
            resultBox.classList.add("show");
            PlayBoard.classList.remove("show");
        }, 700);
        wonText.textContent = "Match has been drawn!";
    }
}
replayBtn.onclick = ()=>{
    window.location.reload();
}