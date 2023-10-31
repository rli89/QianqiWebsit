//引入模块
import {load,isLogin} from "/code/admin/util/loadview.js"

load() //加载topbar //sidemenu

let user = JSON.parse(isLogin())
let categoryList = ["Latest news", "Typical case", "Notice"]

//console.log(user)

document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:100px;"/>  
    <div>
        <div>${user.username}</div>
        <div>${user.introduction || "This guy is lazy"}</div>
    </div>  
`
function renderEcharts(data){

  var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'News posted by the current user',
          subtext: 'The proportion of different categories',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);


}

      async function analyst(){
        let res = await fetch("http://localhost:3000/news?author="+user.username).then(res=>res.json())
        console.log(res)
        let obj = _.groupBy(res, item => item.category)

        let arr = []
        for(let i in obj){
          arr.push({
            name:i,
            value:obj[i].length
          })
        }

        renderEcharts(arr)
      
      }
      analyst()