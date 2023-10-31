//引入模块
import {load} from "/code/admin/util/loadview.js"

load("sidemenu-addUsers") //加载topbar //sidemenu

let photo = ""
addUserForm.onsubmit = async function(evt){
    evt.preventDefault()
    // console.log(username.value)
    // console.log(password.value)
    // console.log(profile.value)
    // console.log(photo)
    await fetch("http://localhost:3000/users",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            profile:profile.value,
            photo
        })
    }).then(res=>res.json())
    location.href = "/code/admin/views/user-manage/UsersList/index.html"
}
photofile.onchange = function(evt) {
    console.log(evt.target.files[0])
    //base 64
    let reader = new FileReader() 
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function(e) {
        // console.log(e.target.result)
        photo=e.target.result
    }
}