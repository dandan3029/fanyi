var serverPath = "localhost:8080";

var m_id = 0;
var task_id = 0;

var enterprise_username = null;
var enterprise_name = null;
var username = null;

var player = null;

var free_area = null;
var task_list = null;

var Right_data = null;
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

    m_id = getUrlParamCN("m_id");
    if (m_id == null){
        return;
    }
    username = getUrlParamCN("designer_username");
    if (username == null){
        return;
    }
    var res0 = null;
    var json0 = {};
    json0.id = m_id;
    var JsonStr0 = JSON.stringify(json0);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_get_by_id.action",
        data:JsonStr0,
        dataType:"json",

        success:function(data){
            console.log(data);
            res0 = data;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    task_id = res0.task_id;

    var res = null;
    var json = {};
    json.id = task_id;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_get_all_property_by_id.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            console.log(data);
            res = data;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });

    var json1 = {};
    json1.username = res.enterprise_username;
    var JsonStr1 = JSON.stringify(json1);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/enterprise_get_info.action",
        data:JsonStr1,
        dataType:"json",

        success:function(data){
            console.log(data);
            enterprise_name = data.name;
            enterprise_username = data.username;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });

    // in main body
    document.getElementById("title").innerText = res.title;
    document.getElementById("money").innerText = res.money;
    document.getElementById("class").innerText = res.class.replace(/\_/g,"  ");

    // right card 1
    document.getElementById("score").innerText = res0.final_score;
    document.getElementById("pro_one").innerText = parseInt(res.property * 100) + '%';
    document.getElementById("pro_two").innerText = parseInt((1 - res.property) * 100) + '%';

    // right card 2
    document.getElementById("enterprise").innerText = enterprise_name;
    document.getElementById("enterprise_username").innerText = enterprise_username;

    var s = res.end_day.substring(0,res.end_day.lastIndexOf('.'));
    s = s.replace(/-/g,"/");
    var date = new Date(s);
    var now = new Date();
    var time_res = Math.floor((date.getTime() - now.getTime()) / 1000 / 3600 / 24) + 1;
    if (time_res <= 0){
        document.getElementById("days").innerHTML = "<img src=\"images/时钟.png\"><strong><span  style=\"color: #a33104\"" +
            " id=\"remain_day\">已停止报名</span></strong>";
    }

    // console.log("num_image:" + num_img);
    // console.log("num_prefix:" + img_prefix_array.length);
    // console.log("num_info:" + img_info.length);
    // console.log("num_base64:" + img_base64_array.length);

    free_area = document.getElementById("free_area");
    puttable();
    rightbuttonLoad();
}

function puttable() {
    // get task list property
    var json = {};
    json.task_id = task_id;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_get_by_task.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            console.log(data);
            task_list = data.result;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    // the verify of stage
    for (var j=0;j<task_list.length;j++){
        if (task_list[j].stage != 2){
            task_list.splice(j,1);
            j--;
        }
    }
    for (var j=0;j<task_list.length;j++){
        var NodeStr = '<td onclick="onMove(' + j +')">' + (j + 1) + '</td>\n' +
            '          <td onclick="onMove(' + j +')">' + task_list[j].designer_name+'</td>\n' +
            '          <td onclick="onMove(' + j +')">' + task_list[j].score + '</td>\n' +
            '          <td onclick="onMove(' + j +')">￥' + task_list[j].money + '</td>\n' +
            '          <td onclick="onMove(' + j +')">' + task_list[j].view + '</td>\n' +
            '          <td onclick="onMove('+ j+ ')">' + task_list[j].share+ '</td>';
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }

}

function onMove(j) {
    window.open("./masterpiece.html?m_id=" + task_list[j].id + "&designer_username=" + getUrlParamCN("designer_username"));
}

function rightbuttonLoad() {
    var json0 = {};
    json0.id = 1;
    var JsonStr0 = JSON.stringify(json0);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_get_All.action",
        data:JsonStr0,
        dataType:"json",

        success:function(data){
            console.log(data);

            Right_data = data.list.sort(function randomsort(a, b) {
                return Math.random()>.5 ? -1 : 1;
            });
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    for (var j=0;j<Right_data.length;j++){
        var now = new Date();
        var end = new Date(Right_data[j].end_day);
        var res = end.getTime() - now.getTime();
        if (res < 0){
            Right_data.splice(j,1);
            j--;
        }
    }
    for (var j=1;j<=4;j++){
        var box1 = document.getElementById("M" + j);
        box1.innerText = Right_data[j-1].money;
        var box2 = document.getElementById("N" + j);
        box2.innerText = Right_data[j-1].title;
        var box3 = document.getElementById("C" + j);
        box3.innerText = Right_data[j-1].num_join;
    }
}

function rightbuttonClicked(j) {
    j = j-1;
    window.open("./step2.html?task_id=" + Right_data[j].id + "&designer_username=" + username);
}

function rightbuttonMore() {
    window.location.href="./viewtask.html?task_id="+ "&designer_username=" + username;
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
