"use strict"
const pieceClasses = {
    'P': 'pawn-white', 'N': 'knight-white', 'B': 'bishop-white', 
    'R': 'rook-white', 'Q': 'queen-white', 'K': 'king-white',
    'p': 'pawn-black', 'n': 'knight-black', 'b': 'bishop-black', 
    'r': 'rook-black', 'q': 'queen-black', 'k': 'king-black'
}
class Piece {
    constructor(pCoord, pType, pId){
        this.pCoord = pCoord
        this.pType = pType
        this.pClass = pieceClasses[pType] 
        this.elem = document.createElement('div')
        this.elem.classList.add(this.pClass, 'piece')
        this.elem.setAttribute('draggable', true);
        this.elem.setAttribute('ondragstart', 'onDragStart(event)'); // Add event handler!!!
        this.pId = pId
    }
}


let initPosition = 
'rnbqkbnr'+
'pppppppp'+
'----k---'+
'--------'+
'---P----'+
'--------'+
'PPPPPPPP'+
'RNBQKBNR'

let initPieceSet = []
// Position is a number starting from top left corner
// Coordinates is an array [x,y] starting from top left corner
function posToCoord(pos){
    return [pos % 8, Math.floor(pos / 8)]
}
function coordToPos(coord){
    return coord[1]*8 + coord[0]
}
// Create initial piece set
for (let i=0;i<64;i++){
    if(initPosition[i]!='-')
        initPieceSet.push( new Piece( posToCoord(i), initPosition[i], `${initPosition[i]}-${i}` ) )
}
console.log(initPieceSet)

const board = document.getElementById('board')
let squares = [] 

function initBoard() { 
    // Create squares and append to the board
    for (let i = 0, j = true; i < 64; i++) {
        let square = document.createElement('div');
        square.classList.add('square', 'glowing-border');
        // Add event hadlers!!!
        square.setAttribute('ondragover', 'onDragOver(event)');
		square.setAttribute('ondrop', 'onDrop(event)')
        if (i % 8 != 0) {
            j = !j;
        }
        if (j) {
            square.classList.add('light-square');
        } else {
            square.classList.add('dark-square');
        }
        squares.push(square)
        board.appendChild(square);
    }
}

initBoard()


function putPiecesOnBoard(){
    for(let i=0;i<initPieceSet.length;i++){
        let pos = coordToPos(initPieceSet[i].pCoord)
        squares[pos].append(initPieceSet[i].elem)
    }
}

putPiecesOnBoard()