
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".rstbtn");
let gamedraw = document.querySelector(".container");
let win = document.querySelector(".winner");
let newgame = document.querySelector(".newgame");
let line = document.querySelector(".win-line");

let count = 0;
let turn0=true;
const winpattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function showWinningLine(iswinner) {
    if (!iswinner) return;

    let board = document.querySelector(".prntbox"); // Game board
    let boardRect = board.getBoundingClientRect(); // Board position
    const rects = iswinner.map(index => boxes[index].getBoundingClientRect());

    let x1 = rects[0].left + rects[0].width / 2;
    let y1 = rects[0].top + rects[0].height / 2;
    let x3 = rects[2].left + rects[2].width / 2;
    let y3 = rects[2].top + rects[2].height / 2;

    let width = Math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2); // Line length
    let angle = Math.atan2(y3 - y1, x3 - x1) * (180 / Math.PI); // Angle calculation

    // line.style.width = `${width}px`;
    // line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
    line.style.width = `${width}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = "1"; // Make it visible

}
const checkwin = () => {
    for(let pattern of winpattern){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != "" ){
            if(val1 == val2 && val2 == val3){
                
                win.innerText =`CONGRATULATION , WINNER IS ${val1}`;
                win.classList.remove("hidewinner");
                newgame.classList.remove("hidenewgame");
               
                for(let box of boxes){
                    box.disabled=true;
                }
                return pattern;

            }
        }
    }

}

const reset=()=>
{
    boxes.forEach((box)=>{

        box.innerText="";
    })
    count=0;
    gamedraw.classList.add("hidecontainer");
    win.classList.add("hidewinner");
    newgame.classList.add("hidenewgame");
    line.style.width = "0px";
    
    for(let box of boxes){
        box.disabled=false;

}}
boxes.forEach((box) => {
   box.addEventListener("click",()=>{
    if(box.innerText===""){
        if(turn0){
            box.innerText="O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        count++;
    }
    let iswinner = checkwin();
    if (iswinner) {
        showWinningLine(iswinner);
    }
      
    if(count===9 && !iswinner){
      
        gamedraw.classList.remove("hidecontainer");
        newgame.classList.remove("hidenewgame");

    }
   
    
    
   })
})
resetbtn.addEventListener("click",reset);
newgame.addEventListener("click",reset);
