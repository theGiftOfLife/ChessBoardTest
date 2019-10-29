"use strict"

const pieceClasses = {
    'P': 'pawn-white', 'N': 'knight-white', 'B': 'bishop-white', 
    'R': 'rook-white', 'Q': 'queen-white', 'K': 'king-white',
    'p': 'pawn-black', 'n': 'knight-black', 'b': 'bishop-black', 
    'r': 'rook-black', 'q': 'queen-black', 'k': 'king-black'
}

function onDragStart(ev){
    ev.dataTransfer.setData('pieceId', ev.target.id)
}

function onDragOver(ev) {
    ev.preventDefault()
}

function onDrop (ev) {
    ev.preventDefault()
    let pieceId = ev.dataTransfer.getData('pieceId')
    // if(!canMove(pieceId)) return
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
}

let position = 
'rnbqkbnr'+
'pppppppp'+
'----k---'+
'--------'+
'---P----'+
'--------'+
'PPPPPPPP'+
'RNBQKBNR'

let pieceSet = []
let moveWhite = true

function posToCoord(pos){
    return [pos % 8, Math.floor(pos / 8)]
}
function coordToPos(coord){
    return coord[1]*8 + coord[0]
}

let pc = {}
for(let k in pieceClasses)
    pc[k]=0
// pc = {'p':0,'r':0,'n':0,'b':0,'q':0,'k':0,'P':0,'R':0,'N':0,'B':0,'Q':0,'K':0}

function createPieceSet(){
    for (let i=0;i<64;i++){
        if(position[i]!='-'){
            let piece = document.createElement('div')
            // piece.id = `${position[i]}${i}`
            piece.id = `${position[i]}${pc[position[i]]}`
            pc[position[i]]+=1
            // Data attributes
            piece.setAttribute('data-pos', i)
            piece.setAttribute('data-ptype', position[i])
            // Event hadlers
            piece.setAttribute('draggable', true);
            piece.setAttribute('ondragstart', 'onDragStart(event)');
            // Class
            piece.classList.add(pieceClasses[position[i]], 'piece')
            // Push
            pieceSet.push( piece )
        }
    }
}
createPieceSet()
console.log(pieceSet)

let squares = [] 

function initBoard() { 
    // Create squares and append them to the board
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
        document.getElementById('board').appendChild(square);
    }
}

initBoard()


function putPiecesOnBoard(){
    for(let i=0;i<pieceSet.length;i++){
        let pos = Number( pieceSet[i].dataset.pos )
        squares[pos].append(pieceSet[i])
    }
}

putPiecesOnBoard()

const moveMatrix = {
    'p':[[0,1],[0,2],[1,1],[1,-1]],
    'P':[[0,-1],[0,-2],[1,-1],[-1,-1]],
    'n':[[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]],
    'N':[[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]],

}

pieceSet.forEach((p)=>{
    let pPos = p.dataset.pos
    let pCoord = posToCoord( Number(pPos) )
    if(moveMatrix[ p.dataset.ptype ] ){

        moveMatrix[ p.dataset.ptype ].forEach((mm) => {
            let destCoord = [pCoord[0]+mm[0],pCoord[1]+mm[1]]
            if(destCoord[0]>=0&&destCoord[1]>=0&&destCoord[0]<=7&&destCoord[1]<=7){ // move is within a board
                let destPos = coordToPos( destCoord )
                squares[pPos].classList.add('glowing-move-start')
                squares[destPos].classList.add('glowing-move-end')
            }
        })
    }
})

