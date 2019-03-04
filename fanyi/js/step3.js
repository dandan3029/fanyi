var serverPath = "localhost:8080";

var m_id = 0;
var task_id = 0;

var enterprise_username = null;
var enterprise_name = null;
var username = null;

var num_img = 0;
var img_base64_array = new Array();
var img_prefix_array = new Array();
var img_info = new Array();

var video_base64 = null;
var video_prefix = null;
var player = null;

var Right_data = null;
var dusername = null;
var eusername = null;

var onchain_area = null;
var num_onchain = 0;
var onchain_code = new Array();

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
            ndiv.id = "img_" + num_img;
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
            var j = num_img - 1;
            var node_str = '<label for="img_info'+ j +'">图' + ( j + 1 ) + '的解释信息：</label>\n' +
                '                <div style="width: 50%">\n' +
                '                    <input type="text" class="form-control" id="img_info'+ j +'">\n' +
                '                </div>\n' +
                '                <div class="layui-form-item" style="width: 30%;">\n' +
                '                    <button class="layui-btn" lay-submit lay-filter="formDemo" id="b' + j + '"\n' +
                '                            style="height: 60px;background: #FF5722;width: 100%;margin-top: 10px" onclick="deleteImage(' + j + ')">\n' +
                '                        删除图片' + ( j + 1 ) + '</button>\n' +
                '                </div><br>';
            var node = document.createElement("div");
            node.innerHTML = node_str;
            node.id = "area" + j;
            tar_node.appendChild(node);
            // the length of box should be added
            var contain = document.getElementsByClassName("content-left")[0];
            var height = contain.style.height;
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
        console.log("name" + name);
        img_prefix_array.push(name);
        console.log("prefixlen" + img_prefix_array.length);
        img_info.push("")
        var a = new FileReader();
        a.onload = function (e) {
            var base64Str = e.target.result;//获取base64
            base64Str = base64Str.substring(base64Str.indexOf(",")+1,base64Str.length);
            img_base64_array.push(base64Str);
        };
        a.readAsDataURL(file);
    }

    //////////////////////////////////////////////////////////////
    console.log("num_image:" + num_img);
    console.log("num_prefix:" + img_prefix_array.length);
    console.log("num_info:" + img_info.length);
    console.log("num_base64:" + img_base64_array.length);
}

function onLoad() {
    dusername = getUrlParamCN("designer_username");
    eusername = getUrlParamCN("enterprise_username");
    onchain_area = document.getElementById("onchain_area");

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
    document.getElementById("explain").value = res0.info;

    // right card 1
    document.getElementById("num_view").innerText = res.num_view;
    document.getElementById("num_join").innerText = res.num_join;
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
    // load the image
    num_img = res0.num_picture;
    if ('image_prefix' in res0){
        img_prefix_array = res0.image_prefix;
    }
    img_info = res0.picture_anno;
    if ('image_prefix' in res0){
        for (j = 0; j< num_img ; j++){
            // add the image
            var path = "http://" + serverPath + "/Masterpiece/" + m_id + '_' + j + res0.image_prefix[j];
            var imgstr="<img style=\"width:228px;height:auto;\" src=\"" + path + "\"/>";
            var oimgbox=document.getElementById("imgboxid");
            var ndiv=document.createElement("div");//创建div节点
            ndiv.id = "img_" + j;
            ndiv.innerHTML = imgstr;
            oimgbox.appendChild(ndiv);
            ndiv.innerHTML=imgstr;
            ndiv.className="img-div";
            oimgbox.appendChild(ndiv);
        }
    }

    // load the image info
    console.log("num_img" + num_img);
    var free_area = document.getElementById("img_info");
    for (j = 0; j< num_img; j++){
        var Node_str = '<label for="img_info'+ j +'">图' + ( j + 1 ) + '的解释信息：</label>\n' +
            '                <div style="width: 50%">\n' +
            '                    <input type="text" class="form-control" id="img_info' + j + '">\n' +
            '                </div>\n' +
            '                <div class="layui-form-item" style="width: 30%;">\n' +
            '                    <button class="layui-btn" lay-submit lay-filter="formDemo" id="b' + j + '"\n' +
            '                            style="height: 60px;background: #FF5722;width: 100%;margin-top: 10px" onclick="deleteImage(' + j +')">\n' +
            '                        删除图片' + ( j + 1 ) + '</button>\n' +
            '                </div><br>';
        var Node = document.createElement("div");
        Node.id = "area" + j;
        Node.innerHTML = Node_str;
        free_area.appendChild(Node);
        var info_text_box = document.getElementById("img_info" + j);
        info_text_box.value = img_info[j];
    }
    // ajax get base64 code
    var json2 = {};
    json2.m_id = parseInt(m_id);
    var JsonStr2 = JSON.stringify(json2);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_get_picture.action",
        data:JsonStr2,
        dataType:"json",

        success:function(data){
            img_base64_array = data.base64;
            console.log("base64" + img_base64_array.length);
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    })
    console.log(res0.num_video);
    // load the video
    if (res0.num_video == 1) {
        var path = "http://" + serverPath + "/Video/" + m_id + res0.video_prefix + '?rand=' + Math.random();
        var player = videojs('player');
        player.src(path);
        player.load();
        document.getElementById("video_img").style.display = "none";
    } else {
        document.getElementById("player_area").style.display = "none";
    }

    // console.log("num_image:" + num_img);
    // console.log("num_prefix:" + img_prefix_array.length);
    // console.log("num_info:" + img_info.length);
    // console.log("num_base64:" + img_base64_array.length);
    rightbuttonLoad();
}

function upload(event){
    //获取所选择文件的名称
    var file=document.getElementById("preview").files[0];

    var fr = new FileReader;
    var src = fr.readAsDataURL(file);
    //获取p标签对象
    var path = document.getElementById("path");
    //将p标签的内容修改为文件名称
    path.innerHTML=file['name'];
    var name = file['name'];
    video_prefix = name.substring(name.lastIndexOf('.'),name.length);
    console.log(video_prefix);


    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.msg('加载中', {
            icon: 16
            ,shade: 0.01
        });
    });

    // get base64
    file = event.target.files[0];
    var a = new FileReader();
    a.onload = function (e) {
        var base64Str = e.target.result;//获取base64
        video_base64 = base64Str.substring(base64Str.indexOf(",")+1,base64Str.length);
        console.log(video_base64);

        // load the video
        var json = {}
        json.id = parseInt(m_id);
        json.prefix = video_prefix;
        json.base64 = video_base64;
        var JsonStr = JSON.stringify(json);

        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/masterpiece_add_video.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                // console.log(data);
                var path = "http://" + serverPath + "/Video/" + m_id + video_prefix + '?rand=' + Math.random();
                console.log(path);
                var player = videojs('player');
                player.src(path);
                player.load(path);
                player.play();
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    document.getElementById("video_img").style.display = "none";
                    document.getElementById("player_area").style.display = "";
                    layer.closeAll("loading");
                    layer.msg("上传成功",{icon:6})
                });
            },
            error:function(data){
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.closeAll("loading");
                    layer.msg("网络异常...",{icon:2});
                });
            }
        });
    };
    a.readAsDataURL(file);
}

function deleteImage(index) {
    // save the input first
    for (var j = 0; j<num_img; j++){
        img_info[j] = document.getElementById("img_info" + j).value;
    }

    // remove the trance in array
    img_prefix_array.splice(index,1);
    img_base64_array.splice(index,1);
    img_info.splice(index,1);

    // delete the picture
    var tar1 = document.getElementById("img_" + index);
    document.getElementById("imgboxid").removeChild(tar1);
    for (j = index + 1 ; j< num_img ; j++){
        var tar = document.getElementById("img_" + j);
        tar.id = 'img_' + (j - 1);
    }
    num_img = num_img - 1;

    // re - generate the input box
    var free_area = document.getElementById("img_info");
    while(free_area.hasChildNodes()){
        free_area.removeChild(free_area.firstChild);
    }
    for (j = 0; j< num_img; j++){
        var Node_str = '<label for="img_info'+ j +'">图' + ( j + 1 ) + '的解释信息：</label>\n' +
            '                <div style="width: 50%">\n' +
            '                    <input type="text" class="form-control" id="img_info' + j + '">\n' +
            '                </div>\n' +
            '                <div class="layui-form-item" style="width: 30%;">\n' +
            '                    <button class="layui-btn" lay-submit lay-filter="formDemo" id="b' + j + '"\n' +
            '                            style="height: 60px;background: #FF5722;width: 100%;margin-top: 10px" onclick="deleteImage(' + j +')">\n' +
            '                        删除图片' + ( j + 1 ) + '</button>\n' +
            '                </div><br>';
        var Node = document.createElement("div");
        Node.id = "area" + j;
        Node.innerHTML = Node_str;
        free_area.appendChild(Node);
        var info_text_box = document.getElementById("img_info" + j);
        info_text_box.value = img_info[j];
    }

    console.log("num_image:" + num_img);
    console.log("num_prefix:" + img_prefix_array.length);
    console.log("num_info:" + img_info.length);
    console.log("num_base64:" + img_base64_array.length);
}

function ondelete() {
    var json = {};
    json.id = m_id;
    json.num_video = 0;
    json.video_prefix = "";
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_change_by_id.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            // console.log(data);
            document.getElementById("video_img").style.display = "";
            document.getElementById("player_area").style.display = "none";
            layui.use(['layer'], function () {
                var layer = layui.layer;
                layer.msg("删除成功",{icon:6})
            });
        },
        error:function(data){
            layui.use(['layer'], function () {
                var layer = layui.layer;
                layer.closeAll("loading");
                layer.msg("网络异常...",{icon:2});
            });
        }
    });
}

function onSubmit() {
    console.log("num_image:" + num_img);
    console.log("num_prefix:" + img_prefix_array.length);
    console.log("num_info:" + img_info.length);
    console.log("num_base64:" + img_base64_array.length);

    // form verify
    var info_box = document.getElementById("explain");
    if (info_box.value.length >= 255){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.alert("作品介绍过长",{icon:2});
        });
    }
    img_info.length = 0;
    for (j = 0; j< num_img;j++){
        img_info.push(document.getElementById("img_info" + j).value);
    }
    for (j = 0 ; j < num_img; j++){
        if(img_info[j].length > 40){
            layui.use(['layer'], function () {
                var layer = layui.layer;
                layer.alert("第" + j + "个图的解释信息过长",{icon:2});
            });
        }
        console.log("base64 " + j + " " + img_base64_array[j].length);
        console.log("prefix" + j + " " + img_prefix_array[j]);
    }

    var json = {};
    json.id = parseInt(m_id);
    json.info = info_box.value;
    json.num_picture = num_img;
    json.picture_info = img_info;
    var JsonStr = JSON.stringify(json);

    var json1 = {};
    json1.id = m_id;
    json1.prefix = img_prefix_array;
    json1.base64s = img_base64_array;
    var JsonStr1 = JSON.stringify(json1);

    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.msg('上传中...', {
            icon: 16
            ,shade: 0.01
        });
    });

    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_change_by_id.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            console.log(data);
            console.log("sucess1");
            $.ajax({
                async:false,
                type:"post",
                contentType: "application/json; charset=utf-8",
                url:"http://" + serverPath + "/upload_image_Masterpiece.action",
                data:JsonStr1,
                dataType:"json",

                success:function(data){
                    layui.use(['layer'], function () {
                        var layer = layui.layer;
                        layer.closeAll("loading");
                        layer.alert("成功保存作品",{
                            icon:6,
                            yes: function () {
                                var on_chain_code = "txid" + generateMixed(64);
                                // layer.alert("您的确权码是：\n " +
                                //     "txid1633f53b34de7f3c4917d2ad4e3ce1a9bd9" +
                                //     "ce8a4d13ee9133936adf46767b9ed\n请妥善保存")
                                layer.alert('您的确权码是：\n' + on_chain_code + '\n请妥善保存')
                                if (num_onchain == 0){
                                    onchain_area.innerHTML = "";
                                }
                                num_onchain += 1;
                                onchain_code.push(on_chain_code);
                                var Node_str = '<div class="list-content" style="border: none;">\n' +
                                    '                <strong style="float: left;margin-right: 100px;"><span id="M4">' + num_onchain + '</span></strong>\n' +
                                    '                <strong><span>' + on_chain_code.substring(0,24) + "..." + '</span></strong>\n' +
                                    '                <strong style="float: right"><span onclick="showcode( '+ num_onchain + ')">复制</span></strong>\n' +
                                    '            </div>';
                                var Node = document.createElement("div");
                                Node.innerHTML = Node_str;
                                onchain_area.appendChild(Node);

                                var json123 = {}
                                json123.id = parseInt(m_id);

                                var JsonStr123 = JSON.stringify(json123);

                                $.ajax({
                                    async:true,
                                    type:"post",
                                    contentType: "application/json; charset=utf-8",
                                    url:"http://" + serverPath + "/check_copy_masterpiece.action",
                                    data:JsonStr123,
                                    dataType:"json",

                                    success:function(data){
                                        console.log("ssss");

                                    },
                                    error:function(data){
                                        console.log("ffff");
                                    }
                                });
                            }});
                    });
                },
                error:function(data){
                    layui.use(['layer'], function () {
                        var layer = layui.layer;
                        layer.closeAll("loading");
                        layer.msg("网络异常...",{icon:2});
                    });
                }
            });


        },
        error:function(data){
            layui.use(['layer'], function () {
                var layer = layui.layer;
                layer.closeAll("loading");
                layer.msg("网络异常...",{icon:2});
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

function showcode(j) {
    console.log(j);
    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.alert("您的确权码是：\n" +
            onchain_code[j-1] + "\n请妥善保存");
    });

}

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;

}

function rightbuttonMore() {
    window.location.href="./viewtask.html?task_id="+ "&designer_username=" + username;
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

