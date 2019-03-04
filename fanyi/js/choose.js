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

var num_check = 0;

var task_data = null;
var task_list = null;
var Checked_id = new Array();


function onLoadit() {
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
    console.log(enterprise_username);
    console.log(task_id);

    document.getElementById("go_main").href = "./index.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_success").href = "./success.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_task").href = "./viewtask.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_rank").href = "./rank.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_masterpiece").href = "./viewm.html?enterprise_username=" + enterprise_username;
    document.getElementById("minemine").href = "./selfcenterE.html?username=" + enterprise_username;

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
            '        <input onclick="onChecked()" type="checkbox" title="PASS" id="check' + j + '">' +
            '        <a class="layui-btn layui-btn-radius layui-btn-normal" style="background: #1E9FFF;color: white;margin-left: 40px;" onclick="onMove('+ j +')">浏览作品</a>' + Str + '</form>' +
            '        </td>';
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }
}

function onMove(j) {
    window.open("./masterpiece.html?m_id=" + task_list[j].id + "&username=" + enterprise_username );
}

function onFin() {
    var str = "";
    Checked_id.length = 0;
    for (var j = 0; j < task_list.length; j++){
        var check_box = document.getElementById("check" + j);

        if (check_box.checked == true){
            Checked_id.push(task_list[j].id);
            str += task_list[j].designer_name + '(';
            str += task_list[j].designer_username + ')';
            str += '\n';
        }
        str = str.substring(0,str.length);
    }
    if (Checked_id.length == 0){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.alert("请选择至少一个作品",{icon:2});
        });
        return;
    }
    if (Checked_id.length >= 5){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.alert("选择数量多于5个",{icon:2});
        });
    } else {
        layer.alert("作者:" + str + "将平分奖励金的20%，并进入下一阶段开发，请确认",{
            yes: function () {
                layer.prompt({
                    formType: 0,
                    value: '',
                    title: '账号身份验证，请输入账号密码',
                    formType: 1,
                }, function(value,index){
                    // ajax to the server
                    var json = {};
                    json.username = enterprise_username;
                    json.password = value;

                    var JsonStr = JSON.stringify(json);
                    $.ajax({
                        async:false,
                        type:"post",
                        contentType: "application/json; charset=utf-8",
                        url:"http://" + serverPath + "/enterprise_login_action.action",
                        data:JsonStr,
                        dataType:"json",

                        success:function(data){
                            console.log(data);
                            layer.closeAll();
                            if (data.res_code == 0){
                                layer.msg("支付操作中，请稍候", {
                                    icon: 16
                                    ,shade: 0.01
                                });
                                var json = {}
                                json.task_id = task_id;
                                json.id = Checked_id;
                                var JsonStr = JSON.stringify(json);
                                console.log(JsonStr);
                                $.ajax({
                                    async:false,
                                    type:"post",
                                    contentType: "application/json; charset=utf-8",
                                    url:"http://" + serverPath + "/enterprise_task_two.action",
                                    data:JsonStr,
                                    dataType:"json",
                                    success:function(data){
                                        console.log(data);
                                    },
                                    error:function(data){
                                        layer.msg("网络连接异常");
                                    }
                                });
                                layer.closeAll("loading");
                                layer.alert("第一阶段完成",{icon:6});
                            } else {
                                layer.alert("密码错误",{icon:2});
                            }
                        },
                        error:function(data){
                            layer.msg("网络连接异常");
                        }
                    })
                });
            }
        });
    }
}

function onpush() {
    layer.alert("泛意提醒您：监测到疑似侵权：<br>http://daily.zhihu.com/story/9695486",{icon:0});
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
