const pieceClasses = {
    'P': 'pawn-white', 'N': 'knight-white', 'B': 'bishop-white', 
    'R': 'rook-white', 'Q': 'queen-white', 'K': 'king-white',
    'p': 'pawn-black', 'n': 'knight-black', 'b': 'bishop-black', 
    'r': 'rook-black', 'q': 'queen-black', 'k': 'king-black'
}
class Piece {
    constructor(pPos, pType){
        this.pPos = pPos
        this.pType = pType
        this.pClass = pieceClasses[pType] 
        this.elem = document.createElement('div')
        this.elem.classList.add(this.pClass)
    }
}


initPosition = 
'rnbqkbnr'+
'pppppppp'+
'--------'+
'--------'+
'--------'+
'--------'+
'PPPPPPPP'+
'RNBQKBNR'

let initPieceSet = []

function posToCoord(pos){
    return [pos % 8, Math.floor(pos / 8)]
}
// Create initial piece set
for (let i=0;i<64;i++){
    if(initPosition[i]!='-')
        initPieceSet.push( new Piece( posToCoord(i), initPosition[i] ) )
}
console.log(initPieceSet)

