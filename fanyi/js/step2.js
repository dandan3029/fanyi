var serverPath = "localhost:8080";
var task_id = null;

var enterprise_username = null;
var enterprise_name = null;
var username = null;

var Right_data = null;

var dusername = null;
var eusername = null;

function onLoad() {
    dusername = getUrlParamCN("designer_username");
    eusername = getUrlParamCN("enterprise_username");
    // console.log(dusername);
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

    task_id = getUrlParamCN("task_id");
    if (task_id == null){
        return;
    }
    // add view ofr task
    var js = {};
    var arr = new Array();
    arr.push(parseInt(task_id));
    js.ids = arr;
    var jsr = JSON.stringify(js);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_readed_by_designer.action",
        data:jsr,
        dataType:"json",

        success:function(data){
            console.log(data);
        },
        error:function(data){
            console.log("error");
        }
    });

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
    console.log(JsonStr1);
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
    document.getElementById("info").innerText = res.describe;

    // right card 1
    document.getElementById("num_view").innerText = res.num_view;
    document.getElementById("num_join").innerText = res.num_join;
    document.getElementById("pro_one").innerText = parseInt(res.property * 100) + '%';
    document.getElementById("pro_two").innerText = parseInt((1 - res.property) * 100) + '%';

    // right card 2
    document.getElementById("enterprise").innerText = enterprise_name;
    document.getElementById("enterprise_username").innerText = enterprise_username;

    var shift_in_box = document.getElementById("shift_in");
    var s = res.end_day.substring(0,res.end_day.lastIndexOf('.'));
    s = s.replace(/-/g,"/");
    var date = new Date(s);
    var now = new Date();
    var time_res = Math.floor((date.getTime() - now.getTime()) / 1000 / 3600 / 24) + 1;
    if (time_res <= 0){
        document.getElementById("days").innerHTML = "<img src=\"images/时钟.png\"><strong><span  style=\"color: #a33104\"" +
            " id=\"remain_day\">已停止报名</span></strong>";
        shift_in_box.style.background = "rgb(180,180,180)";
        shift_in_box.style.borderColor = "rgb(180,180,180)";
        shift_in_box.disabled = "disabled";
    } else {
        document.getElementById("remain_day").innerText = time_res + '天 ';
    }

    var box_1 = document.getElementById("free_area");
    for (j = 0; j < res.sub_title.length; j++){
        var Node_str = "<div class=\"layui-colla-item\">\n" +
            "               <h2 class=\"layui-colla-title\">任务要求" + (j + 1) +'：' + res.sub_title[j] +"</h2>\n" +
            "               <div class=\"layui-colla-content layui-show\">" + res.sub_info[j] + "</div>\n" +
            "           </div>";
        var Node = document.createElement("div");
        Node.innerHTML = Node_str;
        box_1.appendChild(Node);
    }
    //注意：折叠面板 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){
        var element = layui.element;
    });

    var box_2 = document.getElementById("free_area2");
    var base_path = "http://" + serverPath + "/Task/";
    for (j = 0; j < res.num_picture; j++){
        var Node_str = "<div style=\"display: flex\">\n" +
            "                <img src=\"" + base_path + task_id + '_' + j + res.image_prefix[j] + "\" style=\"width: 50%;height: 50%;margin: 0 auto;\">\n" +
            "            </div>\n" +
            "            <div style=\"display: flex\">\n" +
            "                <p style=\"margin: 0 auto; font-size: medium\">" + res.picture_info[j] + "</p>\n" +
            "            </div><br><br>";
        var Node = document.createElement("div");
        Node.innerHTML = Node_str;
        box_2.appendChild(Node);
    }
    rightbuttonLoad();
}

function onShift() {
    // Add a new masterprise
    username = getUrlParamCN("designer_username");
    if (username == null){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.msg('请先登录', function(){
            });
        });
        return;
    }
    var is_enterprise = getUrlParamCN("enterprise");
    if (is_enterprise == 1){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.msg("企业用户无法创建作品",function () {
            });
        });

        return;
    }
    // create a null masterprise
    var json = {};
    json.id = task_id;
    json.designer_username = username;
    json.info = "";
    json.num_picture = 0;
    json.num_video = 0;
    json.task_id = task_id;

    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_add_new.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if (data.res_code == 0){
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.alert("创建成功",{
                        icon : 6,
                        yes: function () {
                            // go to new task
                            var json = {};
                            json.username = username;
                            var JsonStr = JSON.stringify(json);
                            $.ajax({
                                async:false,
                                type:"post",
                                contentType: "application/json; charset=utf-8",
                                url:"http://" + serverPath + "/masterpiece_get_by_designer.action",
                                data:JsonStr,
                                dataType:"json",

                                success:function(data){
                                    console.log(data);
                                    var res = data.result;
                                    var id = 0;
                                    for (j = 0; j<res.length; j++){
                                        if (res[j].task_id == task_id){
                                            id = res[j].id;
                                        }
                                    }
                                    window.location.href=encodeURI("./step3.html?m_id=" + id + "&designer_username=" + username);
                                },
                                error:function(data){
                                    layer.msg("网络异常...")
                                }
                            });
                        }
                    });
                });
            } else {
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.alert("创建失败，用户重复创建任务",{
                        icon : 2,
                    });
                });
            }
        },
        error:function(data){
            layui.use(['layer'], function () {
                var layer = layui.layer;
                layer.alert("添加失败",function () {
                });
            });
        }
    });

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