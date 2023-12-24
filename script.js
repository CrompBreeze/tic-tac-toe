const box = document.querySelectorAll('.box')
const result = document.querySelector('.result');
const button = document.getElementById('start');

button.addEventListener('click',startOver);

function startOver()
{
    box.forEach(x => {
        x.innerHTML = '';
    })
    result.innerHTML = '';
    gameBoard.purge();
    player1.play = 0;
    player2.play = 0;
    box.forEach(x => {
        x.addEventListener('click',handleBoxClick)
    });
}


function handleBoxClick(e) {
    if (player1.play == player2.play) {
        e.target.innerHTML = 'O';
        player1.play++;
        gameBoard.add('O', e.target.id);
    } 
    else 
    {
        e.target.innerHTML = 'X';
        player2.play++;
        gameBoard.add('X', e.target.id);
    }
    e.target.removeEventListener('click', handleBoxClick);
    gameBoard.check();
    if(player1.play == 5)
    {
        result.innerHTML = 'DRAW';;
    }
    
}




box.forEach(x => {
    x.addEventListener('click',handleBoxClick)
});

function player()
{
    let place, play = 0;;
    return {place,play}
}
let player1 = player();
let player2 = player();


const gameBoard = (function()
{
    let board = [[],[],[]];
    let placesToIndex = {1:[0,0],2:[0,1],3:[0,2],4:[1,0],5:[1,1],6:[1,2],7:[2,0],8:[2,1],9:[2,2]};
    let win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    function add(a,b)
    {
        board[placesToIndex[b]] = a;
        
    }
    function check()
    {
        for (let i = 0; i<win.length; i++)
        {
            let count = 0
            let temp = board[placesToIndex[win[i][0]]]
            if (temp == undefined)
            {
                continue;
            }
            for (let j = 1; j<3; j++)
            {
                if (board[placesToIndex[win[i][j]]] == temp)
                {

                    count++;
                }
            }
            if (count == 2 && temp != undefined) 
            {
                if(temp == 'O')
                {
                    result.innerHTML = 'Player 1 Wins!'
                }
                else 
                {
                    result.innerHTML = 'Player 2 Wins!'
                }
            }
          
        }
    }
    
    function purge()
    {
        board = [[],[],[]]
        console.log(board)


    }
    return {add,check,purge};
})();


