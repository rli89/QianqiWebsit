
const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function(evt){
    loginwarning.style.display="none"
   //alert("111")
    evt.preventDefault()
    console.log(username.value,password.value);
//正常post请求
//json-server get获取 post添加 put修改 delete删除
    // fetch("http://localhost:3000/users",{
    //     method:"post",
    //     headers:{
    //         "content-type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         username:"kkk",
    //         password:123
    //     })
    // }).then(res=>res.json()).then(res=>{
    //     console.log(res)
    //})

    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`).then(res=>res.json()).then(res=>{
        console.log(res)
        if(res.length>0){
            //登录成功
            localStorage.setItem("token",JSON.stringify({
                ...res[0],
                password:"******"
            }))
            location.href="/code/admin/views/home/index.html"
        }else{
            //登陆失败
            console.log("fail to log in")
            loginwarning.style.display="block"
        }
    })


}