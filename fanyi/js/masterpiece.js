var serverPath = "localhost:8080";

var m_id = 0;
var task_id = 0;

var enterprise_username = null;
var enterprise_name = null;

var designer_username = null;
var designer_nickname = null;

var username = null;

var designer_data = null;
var enterprise_data = null;
var masterpiece_data = null;
var task_data = null;

function onLoad() {

    // move to page head

    // // layer.load("加载中请稍候...");
    // m_id = getUrlParamCN("m_id");
    // if (m_id == null){
    //     return;
    // }
    // username = getUrlParamCN("username");
    // if (username == null){
    //     return;
    // }
    // // ajax to server
    // // get masterpiece property
    // var res0 = null;
    // var json0 = {};
    // json0.id = m_id;
    // var JsonStr0 = JSON.stringify(json0);
    // $.ajax({
    //     async:false,
    //     type:"post",
    //     contentType: "application/json; charset=utf-8",
    //     url:"http://" + serverPath + "/masterpiece_get_by_id.action",
    //     data:JsonStr0,
    //     dataType:"json",
    //
    //     success:function(data){
    //         // console.log(data);
    //         res0 = data;
    //     },
    //     error:function(data){
    //         layer.msg("网络异常...")
    //     }
    // });
    //
    // task_id = res0.task_id;
    // designer_username = res0.designer_username;
    //
    // // get task property
    // var res = null;
    // var json = {};
    // json.id = task_id;
    // var JsonStr = JSON.stringify(json);
    // $.ajax({
    //     async:false,
    //     type:"post",
    //     contentType: "application/json; charset=utf-8",
    //     url:"http://" + serverPath + "/task_get_all_property_by_id.action",
    //     data:JsonStr,
    //     dataType:"json",
    //
    //     success:function(data){
    //         // console.log(data);
    //         res = data;
    //     },
    //     error:function(data){
    //         layer.msg("网络异常...")
    //     }
    // });
    //
    // // get property of enterprise
    // var json1 = {};
    // var result0 = null;
    // json1.username = res.enterprise_username;
    // var JsonStr1 = JSON.stringify(json1);
    // $.ajax({
    //     async:false,
    //     type:"post",
    //     contentType: "application/json; charset=utf-8",
    //     url:"http://" + serverPath + "/enterprise_get_info.action",
    //     data:JsonStr1,
    //     dataType:"json",
    //
    //     success:function(data){
    //         result0 = data;
    //         enterprise_name = data.name;
    //         enterprise_username = data.username;
    //     },
    //     error:function(data){
    //         layer.msg("网络异常...")
    //     }
    // });
    //
    // // get all property of designer
    // var json2 = {};
    // json2.username = designer_username;
    // var JsonStr2 = JSON.stringify(json2);
    // var result1 = null;
    // $.ajax({
    //     async:false,
    //     type:"post",
    //     contentType: "application/json; charset=utf-8",
    //     url:"http://" + serverPath + "/designer_property_get.action",
    //     data:JsonStr2,
    //     dataType:"json",
    //
    //     success:function(data){
    //         result1 = data;
    //     },
    //     error:function(data){
    //         layer.msg("网络连接异常");
    //     }
    // })
    //
    // // get all of the data
    // designer_data = result1;
    // enterprise_data = result0;
    // task_data = res;
    // masterpiece_data = res0;
    //
    // console.log(designer_data);
    // console.log(enterprise_data);
    // console.log(task_data);
    // console.log(masterpiece_data);

    // input the data into block
    // left box
    var title_box = document.getElementById("title");
    title_box.innerText = task_data.title;
    var main_text_box = document.getElementById("main_text");
    main_text_box.innerText = masterpiece_data.info;

    var play_area = document.getElementById("play_area");
    if (masterpiece_data.num_video > 0){
        play_area.style.display = "";
        var path = "http://" + serverPath + "/Video/" + m_id + masterpiece_data.video_prefix + '?rand=' + Math.random();
        var player = videojs('player');
        player.src(path);
        player.load();
    }

    var like_box = document.getElementById("num_like");
    like_box.innerText = masterpiece_data.likes;

    if (designer_data.num_picture == 0){
        document.getElementById("free_area2").style.display = "none";
        document.getElementById("img_head").style.display = "none";
    } else {
        document.getElementById("img_head").style.display = "";
        var free_area = document.getElementById("free_area2");
        free_area.style.display = "";
        for (var j = 0; j< masterpiece_data.num_picture ; j++){
            // console.log(j);
            var NodeStr = '<div style="display: flex;margin-top: 40px">\n' +
                '                <img src="'+ 'http://' + serverPath + '/Masterpiece/' + m_id + '_' + j + masterpiece_data.image_prefix[j] + '" style="width: 50%;height: 50%;margin: 0 auto;">\n' +
                '            </div>\n' +
                '            <div style="display: flex;margin-top: 20px;margin-bottom: 40px">\n' +
                '                <p style="margin: 0 auto; font-size: medium">' + masterpiece_data.picture_anno[j] + '</p>\n' +
                '            </div><br><br>';
            var Node = document.createElement("div");
            Node.innerHTML = NodeStr;
            free_area.appendChild(Node);
        }
    }

    // right box 1
    var task_info_box = document.getElementById("task_info");
    task_info_box.innerText = task_data.title;

    var task_describe_box = document.getElementById("task_describe");
    task_describe_box.innerText = task_data.describe;

    var enterprise_name_box = document.getElementById("enterprise_name");
    enterprise_name_box.innerText = enterprise_data.name;

    var enterpeise_username_box = document.getElementById("enterprise_username");
    enterpeise_username_box.innerText = enterprise_username;

    // right box 2
    var designer_name_box = document.getElementById("designer_name");
    designer_name_box.innerText =designer_data.nickname;

    var designer_username_box = document.getElementById("designer_username");
    designer_username_box.innerText = designer_data.username;

    // get designer info about task
    var json3 = {}
    json3.username = username;
    var JsonStr3 = JSON.stringify(json3);
    var result3 = null;
    var exp =0
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_get_by_designer.action",
        data:JsonStr3,
        dataType:"json",

        success:function(data){
            result3 = data;
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    });
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_exp_get.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            exp = data.Exp;
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    });

    var num_fin = 0;
    var num_view = 0;
    var num_like = 0;
    var num_share = 0;
    for (j = 0; j< result3.result.length ; j++){
        num_fin ++;
        num_view += result3.result[j].view;
        num_like += result3.result[j].likes;
        num_share+= result3.result[j].share;
    }

    var count1_box = document.getElementById("designer_count1");
    count1_box.innerText = num_fin;

    var count2_box = document.getElementById("designer_count2");
    count2_box.innerText = exp;

    var count3_box = document.getElementById("designer_count3");
    count3_box.innerText = num_share;

    var count4_box = document.getElementById("designer_count4");
    count4_box.innerText = num_like;

    var count5_box = document.getElementById("designer_count5");
    count5_box.innerText = num_view;

    var QQ_box = document.getElementById("qq");
    if ('qq' in designer_data && designer_data.qq.length > 0){
        QQ_box.innerText = designer_data.qq;
    } else {
        QQ_box.innerText = "未设置";
    }

    var weixin_box = document.getElementById("weixin");
    if ('weixin' in designer_data && designer_data.weixin.length > 0){
        weixin_box.innerText = designer_data.weixin;
    } else {
        weixin_box.innerText = "未设置";
    }

    var phone_box = document.getElementById("phone");
    phone_box.innerText = designer_data.username;
    // layer.closeAll('loading');

    // ajax view the page
    var json7 = {};
    json7.id = m_id;
    JsonStr7 = JSON.stringify(json7);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_add_view.action",
        data:JsonStr7,
        dataType:"json",

        success:function(data){
        },
        error:function(data){
        }
    });

}

function onLike() {

}

var is_save = false;
function onSave() {
    var save_box = document.getElementById("save");
    if (is_save == false){
        save_box.innerText = "★  收藏";
        is_save = true;
    } else {
        save_box.innerText = "☆  收藏"
        is_save = false;
    }
}

function onLike() {
    var username = getUrlParamCN("username");
    if (username == null){
        layui.use(['layer'], function () {
            var layer = layui.layer;
            layer.alert("请登陆",{icon:2})
        });
    }
    var json = {};
    json.id = m_id;
    json.username = username;
    JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_like_user.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if (data.res_code == 0){
                console.log(data);
                var like_box = document.getElementById("num_like");
                like_box.innerText = masterpiece_data.likes + 1;
                masterpiece_data.likes += 1;
            } else {
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.msg("你已经点过赞啦！");
                });
            }
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    });

}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}