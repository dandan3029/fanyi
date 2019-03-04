var serverPath = "localhost:8080";
var base_data = null;

var dusername = null;
var eusername = null;

function onLoad() {

    dusername = getUrlParamCN("designer_username");
    eusername = getUrlParamCN("enterprise_username");

    if(dusername != null){
        document.getElementById("go_main").href = "./index.html?designer_username=" +      dusername;
        document.getElementById("go_success").href = "./success.html?designer_username=" + dusername;
        document.getElementById("go_task").href = "./viewtask.html?designer_username=" +   dusername;
        document.getElementById("go_rank").href = "./rank.html?designer_username=" +       dusername;
        document.getElementById("go_masterpiece").href = "./viewm.html?designer_username="+dusername;

        document.getElementById("movemove").href = "./loginE.html";
        document.getElementById("movemove").innerText = "企业入口";
        document.getElementById("minemine").href = "./selfcenter.html?username=" + dusername;
    }
    if (eusername != null){
        document.getElementById("go_main").href = "./index.html?enterprise_username=" + eusername;
        document.getElementById("go_success").href = "./success.html?enterprise_username=" + eusername;
        document.getElementById("go_task").innerText = "发布任务";
        document.getElementById("go_task").href = "./newtask.html?enterprise_username=" + eusername;
        document.getElementById("go_rank").href = "./rank.html?enterprise_username=" + eusername;
        document.getElementById("go_masterpiece").href = "./viewm.html?enterprise_username=" + eusername;

        document.getElementById("movemove").href = "./login.html";
        document.getElementById("movemove").innerText = "用户入口";
        document.getElementById("minemine").href = "./selfcenterE.html?username=" + eusername;
    }

    var json0 = {};
    var JsonStr0 = JSON.stringify(json0);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/get_All_success.action",
        data:JsonStr0,
        dataType:"json",

        success:function(data){
            console.log(data);

            base_data = data.result.sort(function randomsort(a, b) {
                return Math.random()>.5 ? -1 : 1;
            });
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    for (var j=1;j<=base_data.length && j<=12; j++){
        var title_box = document.getElementById("T" + j);
        title_box.innerText = base_data[j-1].designer_name + " 参加任务" + base_data[j -1].title + "的作品";

        var view_box = document.getElementById("V" + j);
        view_box.innerText = base_data[j-1].view;

        var img_box = document.getElementById("M" + j);
        img_box.src = "http://" + serverPath + "/Masterpiece/" + base_data[j -1].id + '_0' + base_data[j-1].prefix;
    }
}

function onMove(j) {
    var dusername = getUrlParamCN("designer_username");
    var eusername = getUrlParamCN("enterprise_username");
    if (dusername != null){
        window.open("./successM.html?m_id=" + base_data[j-1].id + "&designer_username=" + dusername);
    } else if(eusername !=null){
        window.open("./successM.html?m_id=" + base_data[j-1].id + "&enterprise_username=" + eusername);
    }else {
        window.open("./successM.html?m_id=" + base_data[j-1].id);
    }
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
