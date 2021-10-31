let dir = {x : 0,y : 0};
let speed = 10;
let lastPainTime = 0;
let snakeArr = [{x: 13, y: 15}];
food = {x: 9, y: 9};
score = 0;
// for running the programme
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}
// if snake collide then 
function isCollide(snake)
{
    // if snake collide with itself
    for (i = 1; i<snakeArr.length ; i++)
    {
        if(snake[i].x === snake[0].x &&  snake[i].y === snake[0].y)
        {
            return true;
        }
        
    }
    // if snake bumps into wall
    if(snake[0].x >= 18 || snake[0].x <= 0)
    {
        return true;
    }       
    if(snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true;
    }      
}           
// for updating  snake,food
function gameEngine(){
    if(isCollide(snakeArr)){
        dir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }
    // if u eat food then update snake and regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({x : snakeArr[0].x  + dir.x , y : snakeArr[0].y  + dir.y})
        a = 2;
        b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random()) }
    }
    // to move snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += dir.x;
    snakeArr[0].y += dir.y;
    // for placing the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// for highscore
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

// for running the function
window.requestAnimationFrame(main);
// for keys
window.addEventListener('keydown', e =>{
    dir = {x : 0,y : 1};

    switch (e.key){
        case "ArrowUp":
            console.log("arrowup");
            dir.x = 0;
            dir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowdown");
            dir.x = 0;
            dir.y = 1;
            break;
            
        case "ArrowLeft":
           console.log("arrowleft");
           dir.x =  -1;
            dir.y = 0;
           break;

        case "ArrowRight":
            console.log("arrowright");
            dir.x = 1;
            dir.y = 0;
            break;
        default:
            break;    
    }
})