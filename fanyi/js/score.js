var serverPath = "localhost:8080";

var enterprise_username = null;
var task_id = null;

var task_name_box = null;
var task_class_box = null;
var money_class_box = null;
var num_join_box = null;
var start_day_box = null;
var end_day_box = null;
var ensure_box = null;
var free_area = null;

var dusername= null;
var eusername = null;

var task_data = null;
var task_list = null;
var score_array = new Array();


function onLoadit() {
    dusername = getUrlParamCN("designer_username");
    eusername = getUrlParamCN("enterprise_username");
    console.log(dusername);
    console.log(eusername);
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
    //Demo
    layui.use('form', function(){
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function(data){
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });

    enterprise_username = getUrlParamCN("enterprise_username");
    task_id = getUrlParamCN("task_id");
    if (enterprise_username == null || task_id == null) {
        return;
    }
    // get task property

    var json1 = {};
    json1.id = task_id;
    var JsonStr1 = JSON.stringify(json1);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_get_all_property_by_id.action",
        data:JsonStr1,
        dataType:"json",

        success:function(data){
            // console.log(data);
            task_data = data;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });


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
            // console.log(data);
            task_list = data.result;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    console.log(task_data);
    console.log(task_list);

    // todo the verify of stage
    for (var j=0;j<task_list.length;j++){
        if (task_list[j].stage < 1){
            task_list.splice(j,1);
            j--;
        }
    }

    task_name_box = document.getElementById("task_name");
    task_name_box.innerText = task_data.name;

    task_class_box = document.getElementById("task_type");
    task_class_box.innerText = task_data.class.replace(/\_/g,"  ");

    money_class_box = document.getElementById("task_money");
    money_class_box.innerText = task_data.money;

    num_join_box = document.getElementById("task_join");
    num_join_box.innerText = task_data.num_join;

    start_day_box = document.getElementById("start_day");
    end_day_box = document.getElementById("end_day");
    start_day_box.innerText = task_data.start_day.substring(0,task_data.start_day.indexOf(" "));
    end_day_box.innerText = task_data.end_day.substring(0,task_data.end_day.indexOf(" "));

    ensure_box = document.getElementById("sure");

    free_area = document.getElementById("free_area");
    for (var j = 0; j < task_list.length; j++){
        if (Math.random() > 0.5){
            var Str = '<a class="layui-btn layui-btn-radius layui-btn-normal" style="background: #4ecf79;color: white;margin-left: 40px;alignment: right" onclick="">作品安全</a>'
        } else {
            var Str = '<a class="layui-btn layui-btn-radius layui-btn-normal" style="background: #FD482C;color: white;margin-left: 40px;alignment: right" onclick="onpush()">侵权警告</a>'
        }
        var NodeStr =
            '        <td>' + task_list[j].designer_name  + '</td>\n' +
            '        <td>' + task_list[j].designer_username + '</td>\n' +
            '        <td>' + task_list[j].view + '</td>\n' +
            '        <td>' + task_list[j].share + '</td>\n' +
            '        <td>' + task_list[j].likes + '</td>\n' +
            '        <td><form class="layui-form" style="margin-left: 20px;">' +
            '        <div class="layui-input-inline"><input type="text" class="form-control" style="float: left;width: 50%;text-align: center" id="check' + j + '"></div> ' +
            '        <a class="layui-btn layui-btn-radius layui-btn-normal" style="background: #1E9FFF;color: white;margin-left: 40px;" onclick="onMove('+ j +')">浏览作品</a>' + Str + '</form>' +
            '        </td>';
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }
}

function onMove(j) {
    window.open("./masterpiece.html?m_id=" + task_list[j].id + "&enterprise_username=" + enterprise_username );
}

function onFin() {
    score_array.length = 0;
    for (var j = 0 ; j<task_list.length; j++){
        var score_box = document.getElementById("check" + j);
        var score = parseFloat(score_box.value);
        if (isNaN(score)){
            layer.alert(task_list[j].designer_name + "的评分取值不合理",{icon:2});
            return;
        }
        if (score < 0 || score > 100){
            layer.alert(task_list[j].designer_name + "的评分取值不合理",{icon:2});
            return;
        }
        score_array.push(score);
    }
    // console.log(score_array);
    layer.msg('操作进行中请稍候', {
        icon: 16
        ,shade: 0.01
        ,time: 20000
    });
    for (var j = 0; j<task_list.length; j++){
        var json = {};
        json.task_id = task_id;
        json.id = task_list[j].id;
        json.score = score_array[j];
        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/enterprise_score_masterpiece.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                console.log(data);
                // task_data = data;
            },
            error:function(data){
                layer.msg("网络异常...")
            }
        });
    }
    layer.closeAll("loading");
    layer.alert("SUCCESS",{icon:6});

    // run to another page;
}

function onpush() {
    layer.alert("泛意提醒您：监测到疑似侵权：<br>http://daily.zhihu.com/story/9695486",{icon:0});
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
