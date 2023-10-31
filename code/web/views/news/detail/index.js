import {load} from "/code/web/util/loadview.js"
load("topbar-news")

async function render(){
    let id = new URL(location.href).searchParams.get("id")
    let {headline,author,content} = await fetch(`http://localhost:3000/news/${id}`).then(res=>res.json())
    document.querySelector(".headline").innerHTML = headline
    document.querySelector(".author").innerHTML = author
    document.querySelector(".newscontent").innerHTML = content

}
render()