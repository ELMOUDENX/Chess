

let w=90
let board 
let img;
function preload() {
  img = loadImage('Pieces.png');
}


function setup() 
{
	createCanvas(8*w, 8*w);
    noStroke()


    board = new Board()//"8/7B/8/N6P/N/8/P6P/R3k2R/");

}

function draw()
{
    createBoard()
   
    board.show()
    if (board.selected instanceof Piece) {
        board.showeMoves()
    }
    board.checkForChekMate()
     //noLoop()
    // document.getElementById('cw').innerHTML=board.createBoard
}


function createBoard() {
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i+j)%2==1) {
                fill(125,148,93)
            } else {
                fill(238,238,213)
            }
            
            rect(w*i,w*j,w)
        
        }
    }

}
let select=false

function SaveFEN() {
    let fen=''
    let count=0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let p= board.getPeiceAt(j,i)
            
            if (p instanceof Piece) {
                if(count!=0) fen=fen+count.toString()
                fen=fen+p.name
                count=0
            }else{
                count++
            }
        
        }
        if(count==8) fen=fen+count.toString()
        count=0
        fen=fen+'/'
    }
    console.log(fen)
    return fen

}
let backcount=0
function undo(){
    if (backcount+1<board.log.length) {
        backcount++

        board.setupFEN(board.log[board.log.length-backcount-1])
        
        board.t-- 
        

    }

}

function redo(){
    if (backcount>0) {

        backcount--
        board.setupFEN(board.log[board.log.length-backcount-1])
        
        board.t++       
    }

}

function mousePressed() {
    loop()
    let x=floor(mouseX/w)
    let y=floor(mouseY/w)
    if (select) {
        board.moveTo(x,y)
        //board.possibleMoves=[]
        select=false
    }
    if(board.isPeiceAt(x,y)){
        if (board.getPeiceAt(x,y).col==board.t%2) {
            board.selected = board.getPeiceAt(x,y)
            board.possibleMoves=[]
            select=true
            
        } 
       
    }
    
}