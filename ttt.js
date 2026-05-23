const game = (() => {
    let board = []
    const rows=3, columns = 3;
    for(let i=0; i<rows; i++){
        board[i]=[];
        for(let j=0;j<columns; j++){
            board[i].push(cell());
        }
    }
    const getBoard=()=>board;
    function gameControl(
        playerOneName= "Player One",
        playerTwoName="Player Two"){
        const players = [
            {
                name: playerOneName,
                token:1
            },
            {
                name: playerTwoName,
                token:2
            }
        ];
        let activePlayer = players[0];
        const switchPlayer= ()=>{
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }
        const resetPlayer = ()=>{
            activePlayer=players[0];
        }
        const getActivePlayer = ()=>activePlayer;
        const changeHighlight= ()=>{
            const leftSide=document.querySelector('#leftSide');
            const rightSide=document.querySelector('#rightSide');
            activePlayer === players[0] ? (rightSide.style.fontWeight='lighter', leftSide.style.fontWeight='bolder', leftSide.style.fontSize='2rem', rightSide.style.fontSize='1.5rem') : (rightSide.style.fontWeight='bolder', leftSide.style.fontWeight='lighter', rightSide.style.fontSize='2rem',leftSide.style.fontSize='1.5rem')
        }

        return{switchPlayer, getActivePlayer, changeHighlight, resetPlayer}
    }
    function cell(){
        let value= 0;
        const setValue = (playerToken) => {
            if(value === 0){
                value = playerToken;
                return true;
            }
            return false;
        }
        const getValue = () => value;
        return {setValue, getValue};
    }
    function checkWin(){
        // Check rows
        for(let i=0; i<rows; i++){
            if(board[i][0].getValue() !== 0 && board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue()){
                return {win: true, player: board[i][0].getValue()};
            }
        }
        // Check columns
        for(let j=0; j<columns; j++){
            if(board[0][j].getValue() !== 0 && board[0][j].getValue() === board[1][j].getValue() && board[1][j].getValue() === board[2][j].getValue()){
                return {win: true, player: board[0][j].getValue()};
            }
        }
        // Check diagonals
        if(board[0][0].getValue() !== 0 && board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()){
            return {win: true, player: board[0][0].getValue()};
        }
        if(board[0][2].getValue() !== 0 && board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue()){
            return {win: true, player: board[0][2].getValue()};
        }
        return {win: false, player: 0};
    }
    function checkDraw(){
        for(let i=0; i<rows; i++){
            for(let j=0; j<columns; j++){
                if(board[i][j].getValue() === 0){
                    return false;
                }
            }
        }
        return true;
    }
    const pushSVG = (event)=>{
        const cellNO = event.target.closest('div');
        const cellId= cellNO.id;
        const rowNo= Math.floor(parseInt(cellId) / 3);
        const colNo= Math.floor(parseInt(cellId) % 3);
        if(!board[rowNo][colNo].setValue(controller.getActivePlayer().token)){
            return false;
        }
        if(controller.getActivePlayer().token===1){
            cellNO.innerHTML= '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#fffafa" stroke="#fffafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z" fill="#000000"></path></g></svg>'
            cellNO.querySelector('svg').style.height= '40px';
            cellNO.querySelector('svg').style.width= '40px';
        }
        else{
            cellNO.innerHTML='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
            cellNO.querySelector('svg').style.height= '40px';
            cellNO.querySelector('svg').style.width= '40px';
        }
        return true;
    }
const controller = gameControl();
const htmlBoard = document.querySelector(".game");
htmlBoard.addEventListener('click', (event)=>{
    if(pushSVG(event)){
        const winCheck = checkWin();
        const drawCheck = checkDraw();
        if(winCheck.win){
        const topBarContent = document.querySelector("#topBarContent");
        topBarContent.textContent = `Player ${winCheck.player} wins!`;
        topBarContent.style.color= 'gold';
        topBarContent.style.fontWeight= 'bold';
        topBarContent.style.fontSize='5rem';
        htmlBoard.style.pointerEvents = 'none';
        document.querySelector('#leftSide').style.opacity='0';
        document.querySelector('#rightSide').style.opacity='0';
        return;
        }
        else if(drawCheck===true){
            const topBarContent = document.querySelector("#topBarContent");
            topBarContent.textContent = "Game Drawn!";
            topBarContent.style.color= 'gold';
            topBarContent.style.fontWeight= 'bold';
            htmlBoard.style.pointerEvents = 'none';
            document.querySelector('#leftSide').style.opacity='0';
            document.querySelector('#rightSide').style.opacity='0';
            return;
        }
        controller.switchPlayer();
        controller.changeHighlight();
    }
});
const newGame = document.querySelector('#newGame');
newGame.addEventListener('click', ()=>{
    for(let i=0;i<rows; i++){
        board[i]=[];
        for(let j=0;j<columns; j++){
            board[i].push(cell());
        }
    }
    document.querySelectorAll(".game div").forEach(cell => {
    cell.textContent = "";
    });
    document.querySelector('#topBarContent').textContent='Tic Tac Toe';
    document.querySelector('#leftSide').style.opacity='1';
    document.querySelector('#rightSide').style.opacity='1';
    htmlBoard.style.pointerEvents = 'auto';
    controller.resetPlayer();
    controller.changeHighlight();
});
return{getBoard,gameControl};
})();