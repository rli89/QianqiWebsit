//引入模块
import {load} from "/code/admin/util/loadview.js"

load("sidemenu-usersList") //加载topbar //sidemenu

let myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
let myDeleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
let updateId=0
let list=[]
let photodata = ""

async function render() {
    list = await fetch("http://localhost:3000/users").then(res=>res.json())
    console.log(list)

    listbody.innerHTML = list.map(item=>`
                        <tr>
                        <th scope="row">${item.username}</th>
                        <td>
                            <img src="${item.photo}" style="width:50px;border-radius:50%"/>
                        </td>
                          <td>
                        <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default?"disabled":""} data-myid="${item.id}" >edit</button>
                        <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default?"disabled":""} data-myid="${item.id}">delete</button>

                </td>
                        </tr>
    `).join("")
}

listbody.onclick = function(evt) {
    //console.log("edit")
    //console.log("edit",evt.target.dataset.myid)
  
    if(evt.target.className.includes("btn-edit")){
        updateId= evt.target.dataset.myid
        //显示modal框
        //预填
        //console.log(list.filter(item=>item.id==updateId))
        myEditModal.toggle()
        let {username,password,profile,photo} = list.filter(item=>item.id==updateId)[0]
        
        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#profile").value = profile
        photodata = photo

    } else if(evt.target.className.includes("btn-del")) {
        myDeleteModal.toggle()
        // contentbody.innerHTML = list.map(item=>`<text>Are you sure to delete ${item.username} person</text>`)
        updateId= evt.target.dataset.myid
        console.log("delete")
    }
}
editConfirm.onclick =async function(){
    // console.log(document.querySelector("#username").value)
    // console.log(document.querySelector("#password").value)
    // console.log(document.querySelector("#profile").value)
    // console.log(photodata)
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password:document.querySelector("#password").value,
            profile:document.querySelector("#profile").value,
            photo:photodata
        })
    }).then(res=>res.json)

    myEditModal.toggle()
}

photofile.onchange = function(evt) {
    console.log(evt.target.files[0])
    //base 64
    let reader = new FileReader() 
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function(e) {
        // console.log(e.target.result)
        photodata =e.target.result
    } 
}

//删除事件绑定
delConfirm.onclick = async function() {
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"delete"
    }).then(res=>res.json())
    myDeleteModal.toggle()
    render()

}
render()