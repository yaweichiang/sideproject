function ajaxplayer(){
    let url = "getplayers.php?searchtype=ajax_search"
    let request = new XMLHttpRequest
    request.open('GET',url,true)
    request.onload=()=>{
        if(request.status>=200&&request.status<400){
            // 後續將此調整為appendchild結構？
            document.querySelector('.players').innerHTML = request.responseText
        }else{
            console.log('fail');
        }
    }
    request.send()
}
function init(){
    console.log('init')
    let request = new XMLHttpRequest
    let url = ""
    ajaxplayer()
    document.querySelector('.context').addEventListener('click',(e)=>{
        if(e.target.className === 'add'){
            //點「登錄」  
            url = "singup.php?nickname="+document.querySelector('.nickname').value
            request.open('GET',url,true)
            request.onload=()=>{
                if(request.status>=200&&request.status<400){
                    ajaxplayer()
                    if(request.response==='same_nick_name')
                        alert("暱稱重複,請換一個！")
                    else
                        document.querySelector('.nickname').value = ""
                }else{
                    console.log('fail');
                }
            }
            request.send()
        }else if(e.target.className === 'dele'){
            //點「移除」  
            console.log(e.target.previousSibling.data)
            url = "remove.php?nickname="+e.target.previousSibling.firstChild.data
            // console.log(e.target.previousSibling.firstChild.data)
            request.open('GET',url,true)
            request.onload=()=>{
                if(request.status>=200&&request.status<400){
                    ajaxplayer()
                    console.log(request)
                }else{
                    console.log('fail');
                }
            }
            request.send()
        }else if(e.target.className === 'grouping'){
            // 點「分隊」
            console.log("groping")
            let url = "getplayers.php?searchtype=player_search"
            let request = new XMLHttpRequest
            request.open('GET',url,true)
            request.onload=()=>{
                if(request.status>=200&&request.status<400){
                    console.log(JSON.parse(request.responseText))
                    let arr = JSON.parse(request.responseText)
                    document.querySelector('.context>h3').classList.remove("hide")
                    // console.log(arr)
                    getgroups(arr)
                }else{
                    console.log('fail');
                }
            }
            request.send()
        }

    })
}
function getgroups(arr){
    let num = prompt("請問要分幾隊？",2)
    let less_player = arr.length%num
    // 無法平均分配時補空到可以整除
    if(less_player!=0){
        for(let i=1 ; i <= num-less_player ;i++){
            arr.push("");
        }
    }
    console.log(arr)
    let players = arr.length/num
    let new_list={}
    let ran_num;
    if (isNaN(num))
        num = 2
    for(let i = 1 ; i <= num ; i++){
        new_list[i]=[]
        for(let j=1 ; j <= players ; j++ ){
            ran_num = Math.floor(Math.random()*(arr.length))
            new_list[i].push(arr[ran_num]) 
            arr.splice(ran_num, 1)
        }
    }
    let newDiv = document.createElement('div')
    let now = new Date()
    let newTime = document.createElement('p')
    newTime.innerHTML=`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    newDiv.appendChild(newTime)
    for(let i = 1; i <= num ; i++ ){
        let newP = document.createElement('p')
        newP.innerHTML=`第${i}隊：${new_list[i]}`
        newDiv.appendChild(newP)
    }
    document.querySelector('.result').appendChild(newDiv)


}