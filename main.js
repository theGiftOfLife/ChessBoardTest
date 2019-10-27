"use strict"
const board = document.getElementById('board')
let squares = [] 
const pieceClasses = {
    'P': 'pawn-white', 'N': 'knight-white', 'B': 'bishop-white', 
    'R': 'rook-white', 'Q': 'queen-white', 'K': 'king-white',
    'p': 'pawn-black', 'n': 'knight-black', 'b': 'bishop-black', 
    'r': 'rook-black', 'q': 'queen-black', 'k': 'king-black'
}

let revPieceClasses = {};
for (let k in pieceClasses){
    let v = pieceClasses[k]
	revPieceClasses[v] = k
}

let position = {
    board:[
    'r','n','b','q','k','b','n','r',
    'p','p','p','p','p','p','p','p',
    '-','-','-','-','-','-','-','-',
    '-','-','-','-','-','-','-','-',
    '-','-','-','-','-','-','-','-',
    '-','-','-','-','-','-','-','-',
    'P','P','P','P','P','P','P','P',
    'R','N','B','Q','K','B','N','R',
    ]
    ,
    whiteMove: true, 
    sc: true, lc: true, LC: true, SC: true
}

function onDragStart(ev){
    ev.dataTransfer.setData('pieceId', ev.target.id)
}

function onDragOver(ev) {
    ev.preventDefault()
}

function canMove( pieceId ) {
    if( document.getElementById(pieceId).classList[0].includes("white") == position.whiteMove ){
        return true
    }
    else{
        return false
    }
}

function onDrop (ev) {
    ev.preventDefault()
    let pieceId = ev.dataTransfer.getData('pieceId')
    if(!canMove(pieceId)) return
    // Target can be div.square(z-index:1) or div.piece(z-index:2) or drop-box
    if ( ev.target.classList.contains('square') || ev.target.classList.contains('drop-box') ) {
        ev.target.append(document.getElementById(ev.dataTransfer.getData("pieceId")))
    }
    else if ( ev.target.classList.contains('piece') ) {
        // If target is the same piece
        if ( ev.target ===  document.getElementById(pieceId)){
            // don't do anything yet
        } else {
            // If target is different piece that put other piece to drop-box
            ev.target.parentNode.append(document.getElementById(ev.dataTransfer.getData("pieceId")))
            document.getElementById('drop-box').append(ev.target) // Target is a piece
        }
    }
    boardToPosition()
}

function initBoard() { 
    // Create squares and append to the board
    for (let i = 0, j = true; i < 64; i++) {
        let s = document.createElement('div');
        s.classList.add('square', 'glowing-border');
        s.setAttribute('ondragover', 'onDragOver(event)');
		s.setAttribute('ondrop', 'onDrop(event)')
        if (i % 8 != 0) {
            j = !j;
        }
        if (j) {
            s.classList.add('light-square');
        } else {
            s.classList.add('dark-square');
        }
        squares.push(s)
        board.appendChild(s);
    }
}

function positionToBoard () { 
    for (let i = 0; i < 64; i++) {
        if(position.board[i] != '-') {
            let piece = document.createElement('div')
            piece.setAttribute('draggable', true);
	        piece.setAttribute('ondragstart', 'onDragStart(event)');
            piece.classList.add(pieceClasses[position.board[i]], 'piece') // Important line
            piece.id = `piece-${i}`
            // remove all children if any
            // stupid version of managing pieces
            while(squares[i].firstChild){
                squares[i].removeChild(squares[i].firstChild)
            }
            squares[i].append(piece)
        }
    }
}

function boardToPosition(){
    for (let i = 0; i < 64; i++) {
        if(squares[i].children.length > 0){
            position.board[i] = revPieceClasses[ squares[i].children[0].classList[0] ]
        }
        else {
            position.board[i] = '-'
        }
    }
    console.log(position)
    position.whiteMove = !position.whiteMove
}

initBoard()
positionToBoard()