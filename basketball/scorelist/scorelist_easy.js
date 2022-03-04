class Team{
    constructor(na){
        this.name = na;
        this.score = 0;
        this.foul = 0;
    }
    add_score(num){
        this.score+=num;
    }
    add_foul(){
        this.foul+=1;
    }
    change_name(new_na){
        this.name=new_na;
    }
    get_name(){
        return this.name;
    }
    get_score(){
        return this.score;
    }
    get_foul(){
        return this.foul;
    }
    fix_score(){
        this.score-=1;
    }
    fix_foul(){
        this.foul-=1;
    }
    reset_foul(){
        this.foul = 0;
    }
  
}
class Timer{
    constructor(m,p){
        this.O_min = m;
        this.O_part = p;
        this.part = 1;
        this.min = m;
        this.sec = 0;
        this.auto = "";

    }
    get_min(){
        return this.min;
    }
    get_sec(){
        return this.sec;
    }
    get_part(){
        return this.part;
    } 
    timerun(){
        if(this.sec===0 ){
            if(this.min!=0){
                this.min-=1;
                this.sec=60;
            }else
                return;
        }
        this.sec-=1;
    }
    set_auto(id){
        this.auto = id ;
    }
    reset_time(){
        this.min = this.O_min;
        this.sec = 0;
        return this.auto;
    }
    next_part(){
        this.part += 1;
        this.reset_time()
        return this.auto;
    }
    
    
    
    
}

function init(){

    function show_a(){
        document.querySelector('.score_a').innerText = team_a.get_score()
        document.querySelector('.foul_a').innerText = `犯規數：${team_a.get_foul()}`
        if(team_a.get_foul()>=5)
            document.querySelector('.foul_a').style.color='red'
        else
            document.querySelector('.foul_a').style.color='black' 
        
    }
    function show_b(){
        document.querySelector('.score_b').innerText = team_b.get_score()
        document.querySelector('.foul_b').innerText = `犯規數：${team_b.get_foul()}`
        if(team_b.get_foul()>=5)
            document.querySelector('.foul_b').style.color='red'
        else
            document.querySelector('.foul_b').style.color='black' 
    }
    function show_timer(){
        document.querySelector('.min').innerText = timer.get_min()
        document.querySelector('.sec').innerText = timer.get_sec()
        console.log('showtimer')
    }
    function startandpause(){
        if(timer.auto===""){
            timer.set_auto(setInterval(()=>{
                timer.timerun()
                show_timer()
                if(timer.get_min() == 0 && timer.get_sec()==0){
                    clearInterval(timer.auto)
                    timer.set_auto("")
                }
            },1000))
            console.log('star')
        }else{
            show_timer()
            clearInterval(timer.auto)
            timer.set_auto("")
        }
    }
    function show_part(){
        document.querySelector('.part').innerText = timer.get_part()
    }

    let A = prompt('請輸入第一隊隊名:','隊伍一');
    let B = prompt('請輸入第二隊隊名:','隊伍二');
    let P = parseInt(prompt('請輸入要打的節數','4'));
    let M = parseInt(prompt('請輸入每一節的分鐘數','15'));
    console.log(P,M)
    if (A === null) 
        A = '隊伍一'
    if (B === null)
        B = '隊伍二'
    if (isNaN(P))
        P = 4
    if (isNaN(M))
        M = 15
    let team_a = new Team(A)
    let team_b = new Team(B)
    console.log(P,M)
    let timer = new Timer(M,P)
    console.log(timer)
    document.querySelector('.name_a').innerText = team_a.get_name()
    document.querySelector('.name_b').innerText = team_b.get_name()
 
    show_a()
    show_b()
    show_part()
    show_timer()


    document.querySelector('.btn_a').addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON"){
            //    隊伍a的按鈕
                if(e.target.className==='score_add2')
                    team_a.add_score(2)
                else if(e.target.className==='score_add3')
                    team_a.add_score(3)
                else if(e.target.className==='score_add1')
                    team_a.add_score(1)
                else if(e.target.className==='foul')
                    team_a.add_foul()
                else if(e.target.className==='fix_score'){
                    if(team_a.get_score() === 0)
                        return
                    
                    team_a.fix_score()}
                else if(e.target.className==='fix_foul'){
                    if(team_a.get_foul() === 0)
                        return
                    team_a.fix_foul()}

           show_a()
        }
    })
    document.querySelector('.btn_b').addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON"){
            //    隊伍b的按鈕
                if(e.target.className==='score_add2')
                    team_b.add_score(2)
                else if(e.target.className==='score_add3')
                    team_b.add_score(3)
                else if(e.target.className==='score_add1')
                    team_b.add_score(1)
                else if(e.target.className==='foul')
                    team_b.add_foul()
                else if(e.target.className==='fix_score'){
                    if(team_b.get_score() === 0)
                        return 
                    team_b.fix_score()}
                else if(e.target.className==='fix_foul'){
                    if(team_b.get_foul() === 0)
                        return
                    team_b.fix_foul()}
           show_b()
        } 
    })
    document.querySelector('.utils').addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON"){
            //    中間功能的按鈕
            if(e.target.className==='start'){
                startandpause()
            }else if(e.target.className==='changeplace'){
                document.querySelector('.main').classList.toggle('main_re')
            }else if(e.target.className==='next'){
                if(timer.get_min() != 0 || timer.get_sec() !=0 ){
                    if(!confirm("時間尚未結束,確定要換下一節？"))
                        return                          
                }
                clearInterval(timer.next_part())
                timer.set_auto("")
                team_a.reset_foul()
                team_b.reset_foul()
                show_a()
                show_b()
                show_timer()
                show_part()
                console.log(timer.part)
            }else if(e.target.className==='reset'){
                clearInterval(timer.reset_time())
                timer.set_auto("")
                show_timer()
            }
        }
    })

}

