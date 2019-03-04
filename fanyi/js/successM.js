var serverPath = "localhost:8080";
var masterpiece_data = null;
var task_data = null;
var m_id = null;
var task_id = null;

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

    var json0 = {};
    json0.id = parseInt(m_id);
    var JsonStr0 = JSON.stringify(json0);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_get_by_id.action",
        data:JsonStr0,
        dataType:"json",

        success:function(data){
            // console.log(data);
            masterpiece_data = data;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    task_id = masterpiece_data.task_id;
    var json = {};
    json.id = task_id
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_get_all_property_by_id.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            // console.log(data);
            task_data = data;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });

    console.log(masterpiece_data);
    console.log(task_data);

    var title_box = document.getElementById("title");
    title_box.innerText = task_data.title;

    var num_view_box = document.getElementById("num_view");
    num_view_box.innerText = masterpiece_data.view;

    var task_info_box = document.getElementById("task_info");
    task_info_box.innerText = task_data.describe;

    var box_2 = document.getElementById("free_area1");
    var base_path = "http://" + serverPath + "/Task/";
    for (j = 0; j < task_data.num_picture; j++){
        var Node_str = "<div style=\"display: flex\">\n" +
            "                <img src=\"" + base_path + task_id + '_' + j + task_data.image_prefix[j] + "\" style=\"width: 50%;height: 50%;margin: 0 auto;\">\n" +
            "            </div>\n" +
            "            <div style=\"display: flex\">\n" +
            "                <p style=\"margin: 0 auto; font-size: medium\">" + task_data.picture_info[j] + "</p>\n" +
            "            </div><br><br>";
        var Node = document.createElement("div");
        Node.innerHTML = Node_str;
        box_2.appendChild(Node);
    }

    var masterpiece_info_box = document.getElementById("masterpiece_info");
    masterpiece_info_box.innerText = masterpiece_data.info;

    var name_box = document.getElementById("name");
    name_box.innerText = masterpiece_data.designer_name;

    var designer_name_box = document.getElementById("designer_name");
    designer_name_box.innerText = masterpiece_data.designer_name;

    var play_area = document.getElementById("play_area");
    if (masterpiece_data.num_video > 0){
        play_area.style.display = "";
        var path = "http://" + serverPath + "/Video/" + m_id + masterpiece_data.video_prefix + '?rand=' + Math.random();
        var player = videojs('player');
        player.src(path);
        player.load();
    }
    box_2 = document.getElementById("free_area2");
    base_path = "http://" + serverPath + "/Masterpiece/";
    for (j = 0; j < task_data.num_picture; j++){
        var Node_str = "<div style=\"display: flex\">\n" +
            "                <img src=\"" + base_path + m_id + '_' + j + masterpiece_data.image_prefix[j] + "\" style=\"width: 50%;height: 50%;margin: 0 auto;\">\n" +
            "            </div>\n" +
            "            <div style=\"display: flex\">\n" +
            "                <p style=\"margin: 0 auto; font-size: medium\">" + masterpiece_data.picture_anno[j] + "</p>\n" +
            "            </div><br><br>";
        var Node = document.createElement("div");
        Node.innerHTML = Node_str;
        box_2.appendChild(Node);
    }
    var free_area3 = document.getElementById("free_area3");
    var list_class = task_data.class.split('_');
    for (var j=0;j<list_class.length;j++){
        var  Node = document.createElement("span");
        Node.innerText = list_class[j];
        free_area3.appendChild(Node);
    }
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}