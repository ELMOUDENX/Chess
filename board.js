class Board {
    constructor(str="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"){
        this.pieces=[]
        this.pieces[0]=[]
        this.pieces[1]=[]


        
        this.t=0
        this.selected=new Piece()
        this.capturedW=[]
        this.capturedB=[]
        this.possibleMoves=[]

        this.log=[]
        
        this.setupFEN(str)
        this.log.push(str)
        this.kingCHECK=[false,false]

        this.gameOver=false
    }


    getKingP(b=1){

        for (let i = 0; i < this.pieces[b].length; i++) {
            const e = this.pieces[b][i];
            if ( e instanceof King ) 
            {
                return e
            }
        }   
     
    }
    isCheckMate(){
        this.pieces.forEach(ty => {
            ty.forEach(e=>{
                
            })
        });
    }
    checkForChekMate(){
        //check W
        let possible=[]
        let k=this.getKingP(0)
        let Notcheck=0


        for (let i = 0; i < this.pieces[1].length; i++) {
            const e = this.pieces[1][i];
            possible=e.findMoves();
            

            possible.forEach(ee => {

                if (ee.x==k.x&&ee.y==k.y) {
                    this.kingCHECK[0]=true
                    Notcheck=1
                } else {
                    
                }
            });

            
        }
        
        if (Notcheck==0) {
            this.kingCHECK[0]=false
        }

        possible=[]
        Notcheck=0


        k=this.getKingP(1)

        for (let i = 0; i < this.pieces[0].length; i++) {
            const e = this.pieces[0][i];
            possible=e.findMoves();
            

            possible.forEach(ee => {

                if (ee.x==k.x&&ee.y==k.y) {
                    this.kingCHECK[1]=true
                    Notcheck=1
                } else {
                    
                }
            });

            
        }
        if (Notcheck==0) {
            this.kingCHECK[1]=false
        }



    }

    play(){
       while (true) {
            this.selected=random(this.pieces[1])
            this.showeMoves()
            let k=random(this.possibleMoves)
           let p= this.moveTo(k.x,k.y)
           if(p){break}

       }
    }
    setupFEN(string){
        this.pieces=[[],[]]


        let s=string.split('/')
        for (let i = 0; i < s.length; i++) {
            const e = s[i];
            let ss=e.split('')
            let j=0;
            ss.forEach(ee=>{
                
                
                if (!isNaN(Number(ee) )  ) {
                    j=j+Number(ee)
                } else{
                    switch (ee) {
                    case 'K':
                        this.pieces[0].push(new King(  j,i,0))
                        break;
                    case 'B':
                        this.pieces[0].push(new Bishop(  j,i,0))
                        break;
                    case 'N':
                        this.pieces[0].push(new Knigt(  j,i,0))
                        break;
                    case 'R':
                        this.pieces[0].push(new Rock(  j,i,0))
                        break;
                    case 'Q':
                        this.pieces[0].push(new Queen(  j,i,0))
                        break;                     
                    case 'P':
                        this.pieces[0].push(new Pawn(  j,i,0))
                        break; 

                    case 'k':
                        this.pieces[1].push(new King(  j,i,1))
                        break;
                    case 'b':
                        this.pieces[1].push(new Bishop(  j,i,1))
                        break;
                    case 'n':
                        this.pieces[1].push(new Knigt(  j,i,1))
                        break;
                    case 'r':
                        this.pieces[1].push(new Rock(  j,i,1))
                        break;
                    case 'q':
                        this.pieces[1].push(new Queen(  j,i,1))
                        break;                     
                    case 'p':
                        this.pieces[1].push(new Pawn(  j,i,1))
                        break;                    
                   
                    default:
                        break;
                }
                    j++
                }
                    
                


            })

        }
        
    }

    setupp(){
        //this.pieces[0].push(new Rock(  4,4,1))
        this.pieces[0].push(new Rock(  0,0,0))
        this.pieces[0].push(new Knigt( 1,0,0))
        this.pieces[0].push(new Bishop(2,0,0))
        this.pieces[0].push(new Queen( 3,0,0))
        this.pieces[0].push(new King(  4,0,0))
        this.pieces[0].push(new Bishop(5,0,0))
        this.pieces[0].push(new Knigt( 6,0,0))
        this.pieces[0].push(new Rock(  7,0,0))

        for (let i = 0; i < 8; i++) {
           this.pieces[0].push(new Pawn(i,1,0))
        }
        //this.pieces[1].push(new Bishop(2,4,1))

        this.pieces[1].push(new Rock(  0,7,1))
        this.pieces[1].push(new Knigt( 1,7,1))
        this.pieces[1].push(new Bishop(2,7,1))
        this.pieces[1].push(new Queen( 3,7,1))
        this.pieces[1].push(new King(  4,7,1))
        this.pieces[1].push(new Bishop(5,7,1))
        this.pieces[1].push(new Knigt( 6,7,1))
        this.pieces[1].push(new Rock(  7,7,1))

        for (let i = 0; i < 8; i++) {
            this.pieces[1].push(new Pawn(i,6,1))
        }
        
        this.pieces[1].push(new Pawn(4,2,1))

    }
    moveTo(x,y){

        for (let i = 0; i < this.possibleMoves.length; i++) {
            const e = this.possibleMoves[i];
            if (e.x==x && e.y==y) {
                if (this.selected instanceof King && e.x==0) {
                    let u=this.getPeiceAt(0,this.selected.y)
                    if(u instanceof Rock && u.col==this.selected.col && u.firstmove==true){
                        this.selected.move(this.selected.x-2,y)
                        u.move(u.x+3,y)
                    }
                    
                    this.t=this.t+1
                    this.possibleMoves=[]
                    this.selected=NaN
                    return true
                }
                if (this.selected instanceof King && e.x==7) {
                    let u=this.getPeiceAt(7,this.selected.y)
                    if(u instanceof Rock && u.col==this.selected.col && u.firstmove==true){
                        this.selected.move(this.selected.x+2,y)
                        u.move(u.x-2,y)
                    }
                    
                    this.t=this.t+1
                    this.possibleMoves=[]
                    this.selected=NaN
                    return true
                }

                    
               
                if (this.isPeiceAt(x,y)&& this.getPeiceAt(x,y).col!=this.selected.col) {
                    let k=(this.selected.col+1)%2
                    let pp=this.pieces[k].indexOf(this.getPeiceAt(x,y))
                    this.capturedW.push(this.pieces[k].splice(pp,1))

                }
                this.selected.move(x,y)
                this.t=this.t+1
                this.possibleMoves=[]
                this.selected=NaN
                
                this.log.splice(this.t,this.log.length-this.t,SaveFEN())
                return true
            }
            
            }
            return false
        
    }

    show(){
        this.pieces.forEach(e => {
            e.forEach(ee => {
                ee.show()
            });
        });

    }

    isBAt(x,y){
        for (let i = 0; i < this.pieces[1].length; i++) {
            const e = this.pieces[1][i];
            if (e.x==x && e.y==y) {
                
                return true
                
            }
        }
        return false
    }
    isWAt(x,y){
        for (let i = 0; i < this.pieces[0].length; i++) {
            const e = this.pieces[0][i];
            if (e.x==x && e.y==y) {
                
                return true
                
            }
        }
        return false
    
    }
    isPeiceAt(x,y){     
        
        let k


        for (let i = 0; i < this.pieces[0].length; i++) {
            const e = this.pieces[0][i];
            if (e.x==x && e.y==y) {
                
                return true
                
            }
        }

        for (let i = 0; i < this.pieces[1].length; i++) {
            const e = this.pieces[1][i];
            if (e.x==x && e.y==y) {
                
                return true
                
            }
        }

        return false
    }


    getPeiceAt(x,y){

        for (let i = 0; i < this.pieces[0].length; i++) {
            const e = this.pieces[0][i];
            if (e.x==x && e.y==y) {
                
                return e
                
            }
        }

        for (let i = 0; i < this.pieces[1].length; i++) {
            const e = this.pieces[1][i];
            if (e.x==x && e.y==y) {
                
                return e
                
            }
        }


        return 
    }
//    8/7B/8/N6P/N/8/P6P/R3k2R/

    showeMoves(){
        
        this.possibleMoves=[]
        let k=this.selected.findMoves();

        for (let i = 0; i < k.length; i++) {
            const e =k[i];
            if(e.isInside()){
                this.possibleMoves.push(e)
            }

        }
    
       this.possibleMoves.forEach(e=>{e.show()})

    }
}

class Point{

    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    isInside(){
        if (this.x>=0&&this.x<8&&this.y>=0&&this.y<8) {
           return true 
        }
        return false
    }
    show() {
    
        fill(130,180,38)
    
        ellipse(w*(this.x+0.5),w*(this.y+0.5),w/4,w/4)
    }
}

class Piece{
    constructor(i=1,j=1,color=0){ //col=1 black ,col=0 white
        this.x=i
        this.y=j
        this.col=color
    }

    show(){}
    move(){}
    findMoves(){
        return []
    }
}


class King extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.firstmove=true
        this.name= this.col==0?'K':'k'
    }

    checkForChekMate(){
        let m=[]
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                if(board.isPeiceAt(this.x+i,this.y+j)){
                    let p=board.getPeiceAt(this.x+i,this.y+j)
                    if (p.col!=this.col) {
                        m.push(new Point(this.x+i,this.y+j))
                    }
                        
                }
                
            }
            
        

        
        
        }
    }

    show(){
        if (board.kingCHECK[this.col]) {
            fill(256,83,53)
            rect(w*this.x,w*this.y,w)
        } else {
            
        }
        image(img,w*this.x,w*this.y,w,w,0,this.col*200,200,200)

    }
    move(x,y){
        this.x=x
        this.y=y
        this.firstmove=false
    }

    isInCHeck(p){

        let col=(this.col+1)%2
        let possible=[]
        let Notcheck=0
        for (let i = 0; i < board.pieces[col].length; i++) {
            const e = board.pieces[col][i];

            if ( e instanceof King ) continue;
                
           
            
            possible=e.findMoves();
            

            possible.forEach(ee => {

                if (ee.x==p.x&&ee.y==p.y) {
    
                    Notcheck=1
                }
            });

            
        }
        if (Notcheck==0) {
            return false
        }
        return true

      
        
    }
    findMoves(){
        let possibleMove=[]
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                if(!board.isPeiceAt(this.x+i,this.y+j)){
                    possibleMove.push(new Point(this.x+i,this.y+j))
                }else{
                        
                   

                    let p=board.getPeiceAt(this.x+i,this.y+j)
                    if ( p.col!=this.col) {
                        possibleMove.push(new Point(this.x+i,this.y+j))
                    } 
                 }        
                
                
            }
        }

        if(this.firstmove && !board.isPeiceAt(3,7*(1-this.col))&&!board.isPeiceAt(2,7*(1-this.col))&&
            !board.isPeiceAt(1,7*(1-this.col))&&(board.getPeiceAt(0,7*(1-this.col)) instanceof Rock)){
                possibleMove.push(new Point(0,7*(1-this.col)))
        }


        if(this.firstmove && !board.isPeiceAt(5,7*(1-this.col))&&
            !board.isPeiceAt(6,7*(1-this.col))&&(board.getPeiceAt(7,7*(1-this.col)) instanceof Rock)){
                possibleMove.push(new Point(7,7*(1-this.col)))
        }


        let k=[]
        for (let i = 0; i < possibleMove.length; i++) {
            const e =possibleMove[i];
            if(!this.isInCHeck(e)){
                k.push(e)
            }

        }
        
        return k

    }
}
class Queen extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.name= this.col==0?'Q':'q'
    }

    show(){

        image(img,w*this.x,w*this.y,w,w,200,this.col*200,200,200)

    }
    move(x,y){
        this.x=x
        this.y=y 
    }
    
    findMoves(){
        let possibleMove=[]

        for (let i = this.x; i <8; i++) {
            if(board.isPeiceAt(i+1,this.y))  {
                if (board.getPeiceAt(i+1,this.y).col!=this.col) {
                    possibleMove.push(new Point(i+1,this.y))
                }
                break
            }
            possibleMove.push(new Point(i+1,this.y))
        }

        for (let i = this.x; i >0; i--) {
            if(board.isPeiceAt(i-1,this.y))  {
                if (board.getPeiceAt(i-1,this.y).col!=this.col) {
                    possibleMove.push(new Point(i-1,this.y))
                }
                break
            }
            possibleMove.push(new Point(i-1,this.y))
        }
        for (let i = this.y; i <8; i++) {
            if(board.isPeiceAt(this.x,i+1))  {
                if (board.getPeiceAt(this.x,i+1).col!=this.col) {
                    possibleMove.push(new Point(this.x,i+1))
                }
                break
            }
            possibleMove.push(new Point(this.x,i+1))
        }
        for (let i = this.y; i >0; i--) {
            if(board.isPeiceAt(this.x,i-1))  {
                if (board.getPeiceAt(this.x,i-1).col!=this.col) {
                    possibleMove.push(new Point(this.x,i-1))
                }
                break
            }
            possibleMove.push(new Point(this.x,i-1))
        }

        



        for (let i = 1; i <8; i++) {
            if(board.isPeiceAt(this.x+i,this.y+i))  {
                if (board.getPeiceAt(this.x+i,this.y+i).col!=this.col) {
                    possibleMove.push(new Point(this.x+i,this.y+i))
                }
                break
            }
            possibleMove.push(new Point(this.x+i,this.y+i))
        }

        for (let i =1; i <8; i++) {
            if(board.isPeiceAt(this.x-i,this.y-i))  {
                if (board.getPeiceAt(this.x-i,this.y-i).col!=this.col) {
                    possibleMove.push(new Point(this.x-i,this.y-i))
                }
                break
            }
            possibleMove.push(new Point(this.x-i,this.y-i))
        }
        for (let i = 1; i <8; i++){
            if(board.isPeiceAt(this.x-i,this.y+i))  {
                if (board.getPeiceAt(this.x-i,this.y+i).col!=this.col) {
                    possibleMove.push(new Point(this.x-i,this.y+i))
                }
                break
            }
            possibleMove.push(new Point(this.x-i,this.y+i))
        }
        for (let i =1; i <8; i++) {
            if(board.isPeiceAt(this.x+i,this.y-i))  {
                if (board.getPeiceAt(this.x+i,this.y-i).col!=this.col) {
                    possibleMove.push(new Point(this.x+i,this.y-i))
                }
                break
            }
            possibleMove.push(new Point(this.x+i,this.y-i))
        }
        return possibleMove
    }

    
}
class Knigt extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.name= this.col==0?'N':'n'
    }

    show(){

        image(img,w*this.x,w*this.y,w,w,600,this.col*200,200,200)

    }
    move(x,y){
        this.x=x
        this.y=y 
    }

    canMove(x,y){
        if ((this.x-x)**2+(this.y-y)**2==5) {
            return true
        }
        return false
    }
    findMoves(){
        let possibleMove=[]

        possibleMove.push(new Point(this.x+1,this.y+2))
        possibleMove.push(new Point(this.x+1,this.y-2))
        possibleMove.push(new Point(this.x-1,this.y+2))
        possibleMove.push(new Point(this.x-1,this.y-2))
        possibleMove.push(new Point(this.x+2,this.y+1))
        possibleMove.push(new Point(this.x-2,this.y+1))
        possibleMove.push(new Point(this.x+2,this.y-1))
        possibleMove.push(new Point(this.x-2,this.y-1))

        let k=[]
        for (let i = 0; i < possibleMove.length; i++) {
            const e =possibleMove[i];

            let p=board.getPeiceAt(e.x,e.y)
            if(e.isInside()&&(!p|| (p && p.col !=this.col) ) ){
                k.push(e)
            }

        }
        
        return k

    }
}
class Bishop extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.name= this.col==0?'B':'b'
    }

    show(){

        image(img,w*this.x,w*this.y,w,w,400,this.col*200,200,200)

    }
    move(x,y){
        this.x=x
        this.y=y
    }
    
    findMoves(){
        let possibleMove=[]

        for (let i = 1; i <8; i++) { //min()
            if(board.isPeiceAt(this.x+i,this.y+i))  {
                if (board.getPeiceAt(this.x+i,this.y+i).col!=this.col) {
                    possibleMove.push(new Point(this.x+i,this.y+i))
                }
                break
            }
            possibleMove.push(new Point(this.x+i,this.y+i))
        }

        for (let i =1; i <8; i++) {
            if(board.isPeiceAt(this.x-i,this.y-i))  {
                if (board.getPeiceAt(this.x-i,this.y-i).col!=this.col) {
                    possibleMove.push(new Point(this.x-i,this.y-i))
                }
                break
            }
            possibleMove.push(new Point(this.x-i,this.y-i))
        }
        for (let i = 1; i <8; i++){
            if(board.isPeiceAt(this.x-i,this.y+i))  {
                if (board.getPeiceAt(this.x-i,this.y+i).col!=this.col) {
                    possibleMove.push(new Point(this.x-i,this.y+i))
                }
                break
            }
            possibleMove.push(new Point(this.x-i,this.y+i))
        }
        for (let i =1; i <8; i++) {
            if(board.isPeiceAt(this.x+i,this.y-i))  {
                if (board.getPeiceAt(this.x+i,this.y-i).col!=this.col) {
                    possibleMove.push(new Point(this.x+i,this.y-i))
                }
                break
            }
            possibleMove.push(new Point(this.x+i,this.y-i))
        }
        return possibleMove
    }
}
class Rock extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.firstmove=true
        this.name= this.col==0?'R':'r'
    }

    castle(x,y){
        if(
            this.x==x&&this.y==y
        ){
            if(x==0){
                this.move(3,this.y)
            }else{
                this.move(5,this.y)
            }
        }

    }
    show(){

        image(img,w*this.x,w*this.y,w,w,800,this.col*200,200,200)

    }
    move(x,y){
        this.x=x
        this.y=y
        this.firstmove=false
    }
    findMoves(){
        let possibleMove=[]

        for (let i = this.x; i <8; i++) {
            if(board.isPeiceAt(i+1,this.y))  {
                if (board.getPeiceAt(i+1,this.y).col!=this.col) {
                    possibleMove.push(new Point(i+1,this.y))
                }
                break
            }
            possibleMove.push(new Point(i+1,this.y))
        }

        for (let i = this.x; i >0; i--) {
            if(board.isPeiceAt(i-1,this.y))  {
                if (board.getPeiceAt(i-1,this.y).col!=this.col) {
                    possibleMove.push(new Point(i-1,this.y))
                }
                break
            }
            possibleMove.push(new Point(i-1,this.y))
        }
        for (let i = this.y; i <8; i++) {
            if(board.isPeiceAt(this.x,i+1))  {
                if (board.getPeiceAt(this.x,i+1).col!=this.col) {
                    possibleMove.push(new Point(this.x,i+1))
                }
                break
            }
            possibleMove.push(new Point(this.x,i+1))
        }
        for (let i = this.y; i >0; i--) {
            if(board.isPeiceAt(this.x,i-1))  {
                if (board.getPeiceAt(this.x,i-1).col!=this.col) {
                    possibleMove.push(new Point(this.x,i-1))
                }
                break
            }
            possibleMove.push(new Point(this.x,i-1))
        }
        return possibleMove
    }

}
class Pawn extends Piece{
    constructor(x=1,y=1,col=0){
        super(x,y,col)
        this.firstmove=true
        this.name= this.col==0?'P':'p'

    }

    show(){

        image(img,w*this.x,w*this.y,w,w,1000,this.col*200,200,200)

    }

    upgrade(){
        
        $("#popUpDiv").show();
        
        $("#popupSelect").change(function(e) {
            switch ($("#popupSelect").val()) {
                case "Queen":
                    board.pieces[0].push(new Queen(this.x,this.y))
                    break;
                case "Knight":
                    board.pieces[0].push(new Knigt(this.x,this.y))
                    break;
                default:
                    break;
            }
            

            $("#popUpDiv").hide();
         });
    }
    move(x,y){
        this.x=x
        this.y=y
        this.firstmove=false
        if(this.y==7*(1-this.col)){
            this.upgrade()
        }
    }

    findMoves(){
        let possibleMove=[]


        if(!board.isPeiceAt(this.x,this.y-(-1)**this.col)){
            possibleMove.push(new Point(this.x,this.y-(-1)**this.col))
        }
        
        if(this.col==1&&board.isWAt(this.x+1,this.y-(-1)**this.col)){
            possibleMove.push(new Point(this.x+1,this.y-(-1)**this.col))
        }
                
        if(this.col==0&&board.isBAt(this.x+1,this.y-(-1)**this.col)){
            possibleMove.push(new Point(this.x+1,this.y-(-1)**this.col))
        }
        
        if(this.col==1&&board.isWAt(this.x-1,this.y-(-1)**this.col)){
            possibleMove.push(new Point(this.x-1,this.y-(-1)**this.col))
        }
                
        if(this.col==0&&board.isBAt(this.x-1,this.y-(-1)**this.col)){
            possibleMove.push(new Point(this.x-1,this.y-(-1)**this.col))
        }
        
        if (this.firstmove==true&&!board.isPeiceAt(this.x,this.y-2*(-1)**this.col)) {
            possibleMove.push(new Point(this.x,this.y-2*(-1)**this.col))
        } 

        return possibleMove
    }
}

