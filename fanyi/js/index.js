var user_name = null;
var nick_name = null;
var real_name = null;
var is_enterprise = false;
var e_username = null;
var e_name = null;
var base_data = null;
var serverPath = "localhost:8080";

function onLoginClicked() {
    // console.log("redirect to login page");
    window.location.href="./login.html";
}

function onPageLoad() {
    var sym = getUrlParamCN("enterprise_username");
    e_username = getUrlParamCN("enterprise_username");
    if (sym == null){
        is_enterprise = false;
    } else {
        is_enterprise = true;
    }
    console.log(sym);
    console.log(is_enterprise)
    user_name = getQueryString("designer_username");

    if (e_username == null && user_name == null){
        // 什么都不是

    } else {
        if (is_enterprise == true){
            e_username = getQueryString("enterprise_username");
            e_name = getUrlParamCN("name");
            if (e_name == null && getUrlParamCN("enterprise_username")!= null){
                var js = {}
                js.username = getUrlParamCN("enterprise_username");
                var JsonS = JSON.stringify(js);
                $.ajax({
                    async:false,
                    type:"post",
                    contentType: "application/json; charset=utf-8",
                    url:"http://" + serverPath + "/enterprise_get_info.action",
                    data:JsonS,
                    dataType:"json",

                    success:function(data){
                        console.log(data);
                        e_name = data.name;
                    },
                    error:function(data){
                        layer.msg("网络异常...")
                    }
                });
            }
            // 是一个企业

            var self_center = document.getElementById("h_self");

            self_center.style.visibility = "visible";
            self_center.innerText = "企业中心:" + e_name;

            var new_task = document.getElementById("go_task");
            new_task.innerText = "发布任务";
            new_task.href = "./newtask.html?enterprise_username=" + e_username;
            document.getElementById("go_success").href = "./success.html?enterprise_username=" + e_username;
            document.getElementById("go_rank").href = "./rank.html?enterprise_username=" + e_username;
            document.getElementById("go_masterpiece").href = "./viewm.html?enterprise_username=" + e_username;

        } else {
            // 不是企业就是用户
            nick_name = getUrlParamCN("nickname");
            real_name = getUrlParamCN("realname");
            if (nick_name == null && getUrlParamCN("designer_username")!= null){
                var js1 = {}
                js1.username = getUrlParamCN("designer_username");
                var JsonS1 = JSON.stringify(js1);
                $.ajax({
                    async:false,
                    type:"post",
                    contentType: "application/json; charset=utf-8",
                    url:"http://" + serverPath + "/designer_property_get.action",
                    data:JsonS1,
                    dataType:"json",

                    success:function(data){
                        console.log(data);
                        if ('nickname' in data){
                            nick_name = data.nickname;
                        }
                    },
                    error:function(data){
                        console.log(data);
                        layer.msg("网络异常...")
                    }
                });
            }
            var login_button = document.getElementById("b_login");
            login_button.innerText = "退出登陆";
            var self_center = document.getElementById("h_self");
            self_center.style.visibility = "visible";
            var name = getUrlParamCN("nickname");
            if (nick_name != null){
                name = nick_name;
            }
            if (name == "undefined" || name == "null" || name == null || name.length == 0){
                self_center.innerText = "个人中心";
            } else {
                self_center.innerText = "个人中心:" + name;
            }
            document.getElementById("go_success").href = "./success.html?designer_username=" + user_name;
            document.getElementById("go_task").href = "./viewtask.html?designer_username=" + user_name;
            document.getElementById("go_rank").href = "./rank.html?designer_username=" + user_name;
            document.getElementById("go_masterpiece").href = "./viewm.html?designer_username=" + user_name;
        }
    }


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

            base_data = data.list.sort(function randomsort(a, b) {
                return Math.random()>.5 ? -1 : 1;
            });
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });

    for (var j=1; j<=base_data.length && j<=12; j++){
        var title_box = document.getElementById("t" + j);
        //console.log(base_data);
        title_box.innerText = base_data[j-1].title;
        title_box += '<br>';

        if ('img_prefix' in base_data[j-1]){
            var img_box = document.getElementById("i" + j);
            img_box.src = "http://" + serverPath + "/Task/" + base_data[j-1].id + "_0" + base_data[j-1].img_prefix;
            console.log(img_box.src);
        }

        var money_box = document.getElementById("m" + j);
        money_box.innerText = '¥' + base_data[j-1].money;

        var view_box = document.getElementById("v" + j);
        view_box.innerText = base_data[j-1].num_view;

        var join_box = document.getElementById("j" + j);
        join_box.innerText = base_data[j-1].num_join;

        var like_box = document.getElementById("l" + j);
        like_box.innerText = base_data[j-1].num_picture;

        var b_box = document.getElementById("b" + j);
        var now = new Date();
        var end_day = new Date(base_data[j-1].end_day);
        if(end_day.getTime() - now.getTime() > 0){
            b_box.innerText = "我要报名";
            b_box.style.backgroundColor = "";
        } else {
            b_box.innerText = "设计中";
            b_box.style.backgroundColor = "#7ab6f4";
        }
    }

}

function goSelfCenter() {
    var eusername = getQueryString('enterprise_username');
    var dusername = getUrlParamCN("designer_username");
    if (getQueryString('enterprise_username') != null){
        window.location.href=encodeURI("./selfcenterE.html?username=" + eusername + "&nickname=" + nick_name + "&enterprise=1");

    } else {
        window.location.href=encodeURI("./selfcenter.html?username=" + dusername + "&nickname=" + nick_name);
    }
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function onCardClicked(j) {
    j = j-1;
    window.location.href = "./step2.html?task_id=" + base_data[j].id + "&designer_username=" + "18525525028";
}

function GetUrlParms() {
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var i=0;i<pairs.length;i++)
    {
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1) continue;//如果没有找到就跳过
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;
}