//引入模块
import {load,isLogin} from "/code/admin/util/loadview.js"

load("sidemenu-newsList") //加载topbar //sidemenu

//预览模态框
let myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))

let updateId=  0
let list=[]
async function render(){
    let username = JSON.parse(isLogin()).username
    list=await fetch(`http://localhost:3000/news?author=${username}`).then(res=>res.json())
    console.log(list)
    listbody.innerHTML= list.map(item=>`
    <tr>
                        <th scope="row">${item.headline}</th>
                        <td>
                        ${item.category}
                        </td>
                          <td>
                        <button type="button" class="btn btn-success btn-sm btn-preview" ${item.default?"disabled":""} data-myid="${item.id}" >preview</button>
                        <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default?"disabled":""} data-myid="${item.id}" >edit</button>
                        <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default?"disabled":""} data-myid="${item.id}">delete</button>

                </td>
                        </tr>

    `).join("")
}
listbody.onclick = function(evt){
    if(evt.target.className.includes("btn-preview")){
        // console.log("预览",evt.target.dataset.myid)
        myPreviewModal.toggle()

        let obj = list.filter(item=>item.id==evt.target.dataset.myid)[0]
        // console.log(obj)
        renderPreviewModal(obj)
    }
    if(evt.target.className.includes("btn-edit")){
        console.log("edit")
        location.href="/code/admin/views/news-manage/EditNews/index.html?id="+evt.target.dataset.myid //带上id
    }
    if(evt.target.className.includes("btn-del")){
        // console.log("删除",)
        updateId = evt.target.dataset.myid

        //显示删除modal
        myDelModal.toggle()
    }
}
function renderPreviewModal(obj){
    previewModalTitle.innerHTML  = obj.headline
    previewModalContent.innerHTML  = obj.content
}

delConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/news/${updateId}`,{
        method:"delete"
    })
    myDelModal.toggle()

    render()
}

render()