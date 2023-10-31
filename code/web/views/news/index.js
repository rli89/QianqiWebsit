//引入模块
import {load} from "/code/web/util/loadview.js"
load("topbar-news")

let list = []
search.oninput =async function(){
    // console.log(search.value) 
    if(!search.value) {
        document.querySelector(".list-group").computedStyleMap.display = "none"
        return }
        document.querySelector(".list-group").computedStyleMap.display = "block"
        let res = await fetch("http://localhost:3000/news?headline_like="+search.value).then(res=>res.json())
        console.log(res)
        document.querySelector(".list-group").innerHTML=res.map(item=>`
        <li class="list-group-item"><a href="/code/web/views/news/detail/index.html">${item.headline}</li> 
        `).join("")
     
}

search.onblur = function() {
    setTimeout(()=>{
        document.querySelector(".list-group").computedStyleMap.dispaly = "none"
    },300)
}

async function render(){
    await renderList()
    await renderTab()
}
async function renderList(){
    list =await fetch("http://localhost:3000/news").then(res=>res.json())
    list.reverse()

    let cardcontainer = document.querySelector(".cardContainer")
    cardcontainer.innerHTML = list.slice(0,4).map(item=>`
        <div class="card" data-id=${item.id}>
        <div style="background-image:url(${item.cover});" class="imgcover"></div>
        <div class="card-body">
        <h5 class="card-title" style="font-size:16px">${item.headline}</h5>
        <p class="card-text" style="font-size:12px; color:gray;">author:${item.author}</p>
        
        </div>
    </div>
    `).join("")

    for(let item of document.querySelectorAll(".card")){
        // console.log(item.dataset.id)
        item.onclick = function(){
            location.href=`/code/web/views/news/detail/index.html?id=${item.dataset.id}`
        }
       }

}

function renderTab(){

    let categoryObj = _.groupBy(list,item=>item.category)
    
    let tabs = [tab0,tab1,tab2]
     tabs.forEach((item,index)=>{
       
        item.onclick = function(evt){
            // console.log("111",evt.target.dataset.id)
            location.href=`/code/web/views/news/detail/index.html?id=${evt.target.dataset.id}`
        }
    })
   
    tab0.innerHTML = categoryObj["Latestnews"]?.map(item=>
        `<div class="listitem" data-id="${item.id}">
            <img src="${item.cover}" data-id="${item.id}"/>
            <div data-id="${item.id}">${item.headline}</div>
            <p class="card-text" style="font-size:12px;color:gray;" data-id="${item.id}">作者:${item.author}</p>
        </div>`
    
    ).join("")
    tab1.innerHTML = categoryObj["Notice"]?.map(item=>
        `<div class="listitem" data-id="${item.id}">
            <img src="${item.cover}" data-id="${item.id}"/>
            <div data-id="${item.id}">${item.headline}</div>
            <p class="card-text" style="font-size:12px;color:gray;" data-id="${item.id}">作者:${item.author}</p>
        </div>`
    
    ).join("")

    console.log(categoryObj["Typicalcase"])
    tab2.innerHTML = categoryObj["Typicalcase"]?.map(item=>
        `<div class="listitem" data-id="${item.id}">
            <img src="${item.cover}" data-id="${item.id}"/>
            <div data-id="${item.id}">${item.headline}</div>
            <p class="card-text" style="font-size:12px;color:gray;" data-id="${item.id}">作者:${item.author}</p>
        </div>`
    
    ).join("")

}

render()