var isTest = true;

var serverPath = "localhost:8080";
var realname = null;
var nickname = null;
var username = null;
function onLoginClicked() {
    var box_username = document.getElementById("username");
    var box_password = document.getElementById("password");
    var username = box_username.value;
    var password = box_password.value;

    if (password.length < 6){
        layer.msg('请输入正确密码', function(){
        });
        box_password.value = "";
    }

    // Email regulation
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(reg.test(username)){ //正则验证不通过，格式不对
        // User input the email
        loginWithEmail();
        return;
    }

    var reg_phone=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg_phone.test(username) && isTest == false) {
        layer.msg("请输入正确的手机号码或邮箱！");
        box_username.value = "";
    } else {
        // VOID
    }


    var json = {};
    json.username = username;
    json.password = password;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_login_action.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if(data.res_code == 0){
                // alert('成功' + data.res_str);
                getPropertyOfUser(username);
                window.location.href=encodeURI("./index.html?designer_username=" + username +"&realname=" + realname +
                    "&nickname=" + nickname);
            }else{
                // alert('失败' + data.res_str);
                if (data.res_str == "No user"){
                    $('#error_info').text("该用户没有注册");
                    box_password.value = "";
                    box_username.value = "";
                }
                if (data.res_str == "Password is wrong"){
                    $('#error_info').text("密码错误");
                    box_password.value = "";
                }
            }
        },
        error:function(data){
            // alert("网络连接异常");
        }
    })
}

function getPropertyOfUser(username) {
    var json = {};
    json.username = username;
    var JsonStr = JSON.stringify(json);
    console.log(JsonStr);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_property_get.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if(data.res_code == 0){
                username = data.username;
                nickname = data.nickname;
                realname = data.realname;
            }
        },
        error:function(data){
            alert("网络连接异常");
        }
    })
}

function loginWithEmail() {
    var box_username = document.getElementById("username");
    var box_password = document.getElementById("password");
    var username = box_username.value;
    var password = box_password.value;

    var json = {};
    json.email = username;
    json.password = password;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_login_email_action.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if(data.res_code == 0){
                // alert('成功' + data.res_str);
                username = data.username;
                getPropertyOfUser(username);
                window.location.href=encodeURI("./index.html?designer_username=" + username +"&realname=" + realname +
                    "&nickname=" + nickname);
            }else{
                // alert('失败' + data.res_str);
                if (data.res_str == "No email record, Sign in or use phonenum"){
                    $('#error_info').text("该用户没有注册");
                    box_password.value = "";
                    box_username.value = "";
                }
                if (data.res_str == "Password is wrong"){
                    $('#error_info').text("密码错误");
                    box_password.value = "";
                }
            }
        },
        error:function(data){
            // alert("网络连接异常");
        }
    })

}

function onLoad() {
    var username = getQueryString("prefix");
    var username_box = document.getElementById("username");
    if (username != null){
        username_box.value = username;
        layer.alert("注册成功", {icon: 6});
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
