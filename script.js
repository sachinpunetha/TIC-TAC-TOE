let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".rstbtn");
let gamedraw = document.querySelector(".container");
let win = document.querySelector(".winner");
let newgame = document.querySelector(".newgame")
let count = 0;
let turn0=true;
const winpattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
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
    }
    let iswinner = checkwin();
      
    count++;
    if(count===9 && !iswinner){
      
        gamedraw.classList.remove("hidecontainer");
        newgame.classList.remove("hidenewgame");

    }
   
    
    
   })
})
resetbtn.addEventListener("click",reset);
newgame.addEventListener("click",reset);
