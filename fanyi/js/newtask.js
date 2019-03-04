var num_sub_title = 1;
var num_img = 0;

var username = null;
var account = null;
var acc_disp = null;

var verify_success = false;

var need_box = null;
var money_box = null;
var pro_A_box = null;
var pro_B_box = null;
var check_box_A = null;
var check_box_B = null;
var check_box_C = null;
var check_box_D = null;
var info_box = null;
var date_A_box = null;
var date_B_box = null;
var date_C_box = null;
var date_D_box = null;

var sub_title_array = new Array();
var sub_info_array = new Array();
var img_base64_array = new Array();
var img_prefix_array = new Array();
var img_info = new Array();

var Right_data = null;

// data use for ajax
var serverPath = "localhost:8080";

var begin_time = null;
var end_time = null;
var begin_time2 = null;
var end_time2 = null;
var need = null;
var property = null;
var info = null;
var class_str = "";
var money;

var task_id;

var dusername = null;
var eusername = null;
rightbuttonLoad();

function onLoad() {
    var enterprise_username = getUrlParamCN("enterprise_username");

    document.getElementById("go_main").href = "./index.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_success").href = "./success.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_task").href = "./viewtask.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_rank").href = "./rank.html?enterprise_username=" + enterprise_username;
    document.getElementById("go_masterpiece").href = "./viewm.html?enterprise_username=" + enterprise_username;
    document.getElementById("minemine").href = "./selfcenterE.html?username=" + enterprise_username;
}

//选择图片，马上预览
function xmTanUploadImg(obj) {

    var fl=obj.files.length;
    for(var i=0;i<fl;i++){
        var file=obj.files[i];
        // 判断图片
        if(!/image\/\w+/.test(file.type)){
            alert('请上传图片!');
            return false;
        }
        var reader = new FileReader();
        //读取文件过程方法
        reader.onerror = function (e) {
            console.log("读取异常....");
        }

        reader.onload = function (e) {
            var imgstr='<img style="width:228px;height:auto;" src="'+e.target.result+'"/>';
            var oimgbox=document.getElementById("imgboxid");
            var ndiv=document.createElement("div");//创建div节点
            num_img += 1;

            //限制上传的图片数
            var a=$('#imgboxid>div').length;
            if(a<5){
                ndiv.innerHTML=imgstr;
                ndiv.className="img-div";
                oimgbox.appendChild(ndiv);
            }else{
                alert('最多5张图片');
            }

            // add new info text
            var tar_node = document.getElementById("img_info");
            var node_str = "<label for=\"img_info\" " + num_img + ">图" + num_img + "的解释信息：</label>\n" +
                "            <div style=\"width: 50%\"><input type=\"text\" class=\"form-control\" id=\"img_info" + num_img + "\"></div>\n";
            var node = document.createElement("div");
            node.innerHTML = node_str;
            tar_node.appendChild(node);
            // the length of box should be added
            var contain = document.getElementsByClassName("content-left")[0];
            var height = contain.style.height;
            //  contain.style.height = '100px';
            // height = height.substring(height.indexOf('p') + 1,height.length);
            // rate of increase
            var cpmputed = parseInt(height) + 150;
            contain.style.height = cpmputed + "px";
            console.log(contain.style.height);
        }
        reader.readAsDataURL(file);
    }

    //////////////////////////////////////////////////////////////
    // 傅川溥添加，获取Base64编码，与文件名
    for (j = 0; j < fl ; j++){
        var file = obj.files[j];
        var  name = file.name;
        name = name.substring(name.lastIndexOf('.'),name.length);
        img_prefix_array.push(name);
        console.log(name);
        img_prefix_array.push()
        var a = new FileReader();
        a.onload = function (e) {
            var base64Str = e.target.result;//获取base64
            base64Str = base64Str.substring(base64Str.indexOf(",")+1,base64Str.length);
            img_base64_array.push(base64Str);
        };
        a.readAsDataURL(file);
    }

    //////////////////////////////////////////////////////////////

}

function onAddSubTitle(){
    // var last_node = document.getElementById("node_" + num_sub_title);
    if (num_sub_title == 3){
        layer.msg('至多添加3个任务要求', function(){
        });
        return;
    }
    var last_node = document.getElementById("node_1");

    var node = document.createElement("div");
    num_sub_title += 1;
    var node_str =
        "            <label for=\"need" + num_sub_title + "\">任务要求 " + num_sub_title + "：</label>\n" +
        "            <div style=\"width: 50%\"><input type=\"text\" class=\"form-control\" id=\"need" + num_sub_title + "\"></div>\n" +
        "            <label for=\"explain" + num_sub_title + "\" style=\"margin-top: 30px;\" style=\"font-size: 24px;\">任务要求说明" + num_sub_title + "：</label>\n" +
        "            <textarea class=\"form-control\" rows=\"5\" id=\"explain" + num_sub_title+ "\"></textarea>";
    node.innerHTML = node_str;
    node.id = "node_" + num_sub_title;
    last_node.appendChild(node);

    var contain = document.getElementsByClassName("content-left")[0];
    var height = contain.style.height;
    //  contain.style.height = '100px';
    // height = height.substring(height.indexOf('p') + 1,height.length);
    // rate of increase
    var cpmputed = parseInt(height) + 450;
    contain.style.height = cpmputed + "px";
    console.log(contain.style.height);
}

function onAddTask() {
    username = getUrlParamCN('enterprise_username');
    if (username == null){
        return;
    }
    var res = addTask();
    if (res == null){
        return;
    }
    if (!res){
        return;
    }

    var json = {};
    json.username = username;
    var JsonStr = JSON.stringify(json);
    var sym = false;
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/enterprise_get_info.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            console.log(data)
            if(data.res_code == 0){
                if ('citi' in data){
                    account = data.citi;
                    acc_disp = data.citi_num;
                    sym = true;
                }
            }
        },
        error:function(data){
            alert("网络连接异常");
        }
    });
    if (sym == false){
        layer.alert("请先绑定花旗银行账号完成支付",{icon : 2});
        return;
    }
    layer.open({
        type: 2,
        title: '花旗银行支付身份验证',
        shadeClose: true,
        shade: 0.6,
        maxmin: true, //开启最大化最小化按钮
        area: ['700px', '600px'],
        content: './subwindow3.html?username=' + username + "&account=" + account + "&display=" + acc_disp,
        end: function () {
            // todo
            console.log(verify_success);
            if (verify_success == true){
                layer.msg('提交中', {
                    icon: 16
                    ,shade: 0.01
                });
                // ajax to server
                var json = {};
                json.username = username;
                json.name = username + need;
                json.title = need;
                json.info = info;
                json.classify = class_str;
                json.start_day = begin_time + " 00:00:00";
                json.end_day = end_time + " 00:00:00";
                json.start_day2 = begin_time2 + " 00:00:00";
                json.end_day2 = end_time2 + " 00:00:00";
                json.num_picture = num_img;
                json.money = money;
                json.property  = property;
                json.sub_task_title = sub_title_array;
                json.sub_task_info = sub_info_array;
                json.picture_info = img_info;
                var JsonStr = JSON.stringify(json);
                console.log(JsonStr.toString());
                $.ajax({
                    async:false,
                    type:"post",
                    contentType: "application/json; charset=utf-8",
                    url:"http://" + serverPath + "/task_add_action.action",
                    data:JsonStr,
                    dataType:"json",

                    success:function(data){
                        console.log("DD"+data);
                        if(data.res_code == 0){
                            task_id = data.id;
                            // console.log("success1");
                        }
                    },
                    error:function(data){
                        alert("网络连接异常");
                    }
                });

                if (task_id == null){
                    return;
                }

                // load the iamge
                var json1 = {};
                json1.id = task_id;
                json1.prefix = img_prefix_array;
                json1.base64s = img_base64_array;
                var JsonStr1 = JSON.stringify(json1);
                $.ajax({
                    async:false,
                    type:"post",
                    contentType: "application/json; charset=utf-8",
                    url:"http://" + serverPath + "/upload_image_Task.action",
                    data:JsonStr1,
                    dataType:"json",

                    success:function(data){
                        if(data.res_code == 0){
                            layer.closeAll("loading");
                            layer.alert("创建新任务成功",{icon:6});
                        }
                    },
                    error:function(data){
                        alert("网络连接异常");
                    }
                });

                console.log("success");
            }
        }
    });
    rightbuttonLoad();
}

function addTask() {
    need_box = document.getElementById("need");
    if (need_box.value.length > 32){
        layer.alert("需求名称过长",{icon:2});
        need_box.value = null;
        return false;
    }
    if (need_box.value.length == 0 || need_box.value == ""){
        layer.alert("需求名称不可以为空",{icon : 2});
        need_box.value = null;
        return false;
    }
    need = need_box.value;

    money_box = document.getElementById("money");
    if (money_box.value.length == 0 || money_box.value == ""){
        layer.alert("奖金不可以为空",{icon : 2});
        money_box.value = null;
        return false;
    }
    money = parseFloat(money_box.value);
    if (money == null || isNaN(money)){
        layer.alert("奖励金额不合法",{icon:2});
        money_box.value = null;
        return false;
    }

    date_A_box = document.getElementById("time1");
    date_B_box = document.getElementById("time2");
    date_C_box = document.getElementById("time3");
    date_D_box = document.getElementById("time4");
    begin_time = date_A_box.value;
    end_time = date_B_box.value;
    begin_time2 = date_C_box.value;
    end_time2 = date_D_box.value;

    // console.log(begin_time);
    var curTime = new Date();
    //把字符串格式转化为日期类
    var starttime = new Date(Date.parse(begin_time));
    var endtime = new Date(Date.parse(end_time));
    var starttime2 = new Date(Date.parse(begin_time2));
    var endtime2 = new Date(Date.parse(end_time2));
    //进行比较
    if (curTime>=starttime || curTime>=endtime || curTime>=starttime2 || curTime>=endtime2){
        date_A_box.value = "";
        date_B_box.value = "";
        date_C_box.value = "";
        date_D_box.value = "";
        layer.alert("开始与结束时间不可早于当前",{icon:2});
        return false;
    }

    if (starttime2 <= endtime){
        date_A_box.value = "";
        date_B_box.value = "";
        date_C_box.value = "";
        date_D_box.value = "";
        layer.alert("宣传开始时间不能早于报名截止");
        return false;
    }

    pro_A_box = document.getElementById("pro_A");
    pro_B_box = document.getElementById("pro_B");
    var pro_A = parseFloat(pro_A_box.value);
    var pro_B = parseFloat(pro_B_box.value);
    if (pro_A == null || pro_B == null || pro_A <=0 || pro_B <= 0 || isNaN(pro_A) || isNaN(pro_B)){
        pro_B_box.value = null;
        pro_A_box.value = null;
        layer.alert("比例不合法",{icon:2});
        return false;
    }
    property = pro_A / (pro_A + pro_B);
    check_box_A = document.getElementById("check1");
    check_box_B = document.getElementById("check2");
    check_box_C = document.getElementById("check3");
    check_box_D = document.getElementById("check4");
    class_str = "";
    if (check_box_A.checked){
        class_str += "产品广告_";
    }
    if (check_box_B.checked){
        class_str += "品牌广告_";
    }
    if (check_box_C.checked){
        class_str += "观念广告_";
    }
    if (check_box_D.checked){
        class_str += "公益广告_";
    }

    info_box = document.getElementById("explain");
    if (info_box.value.length > 255){
        layer.alert("介绍信息过长",{icon:2});
        info_box.value = null;
        return false;
    }
    if (info_box.value.length == 0 || info_box.value == ""){
        layer.alert("介绍信息不可以为空",{icon : 2});
        info_box.value = null;
        return false;
    }
    info = info_box.value;

    sub_info_array.length = 0;
    sub_title_array.length = 0;
    for (j = 0; j< num_sub_title ; j++){
        var title_box = document.getElementById("need" + (j + 1));
        var text_box = document.getElementById("explain" + (j + 1));
        if (title_box.value.length ==0 || title_box.value == ""){
            layer.alert("第" + (j+1) +"个任务要求不可为空",{icon:2});
            return false
        }
        if (text_box.value.length ==0 || text_box.value == ""){
            layer.alert("第" + (j+1) +"个任务要求下的文本不可为空",{icon:2});
            return false;
        }
        if (title_box.value.length > 255){
            layer.alert("第" + (j+1) +"个任务要求过长",{icon:2});
            return false;
        }
        if (text_box.value.length > 255){
            layer.alert("第" + (j+1) +"个任务要求下文本过长",{icon:2});
            return false;
        }
        sub_title_array.push(title_box.value);
        sub_info_array.push(text_box.value);
    }

    img_info.length = 0;
    for (j=0; j<num_img; j++){
        var info_box = document.getElementById("img_info" + ( j+ 1));
        if (info_box.value.length > 255){
            layer.alert("第" + (j+1) +"个图片备注信息过长",{icon:2});
            return false;
        }
        img_info.push(info_box.value);
    }

    return true;
}

function rightbuttonLoad() {

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