var phone = null;
var serverPath = "localhost:8080";

function onGetCode() {
    var phonenum_box = document.getElementById("phonenum");
    var phonenum = phonenum_box.value;
    var reg_phone=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (phonenum.length == 0){
        layer.msg('输入的手机号为空！', function(){
        });
    }
    if (!reg_phone.test(phonenum) && isTest == false) {
        layer.msg("请输入正确的手机号！");
        phonenum_box.value = "";
    } else {
        phone = phonenum;
    }
    var json = {};
    json.phonenum = phonenum;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/enterprise_get_code.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if(data.res_code == 0){
                // alert('成功' + data.res_str);
                layer.msg("验证码已发送");
            }else{
                layer.msg("验证码发送失败");
            }
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    })
}

function onCreate() {
    var check = document.getElementById('check').checked;
    if (check == false){
        layer.msg('没有同意遵守《企业入驻协议》', function(){
        });
        return null;
    }
    var phonenum_box = document.getElementById("phonenum");
    var code_box = document.getElementById("code");
    var psd1_box = document.getElementById("password1");
    var psd2_box = document.getElementById("password2");
    var name_box = document.getElementById("name");
    var email_box = document.getElementById("email");
    var realm_box = document.getElementById("realm");
    var phonenum = phonenum_box.value;
    var psd1 = psd1_box.value;
    var psd2 = psd2_box.value;
    var email = email_box.value;
    var realm = realm_box.value;
    var name = name_box.value;
    var info = "暂无";
    if (psd1 != psd2){
        layer.alert('两次密码输入不一致', {icon: 2});
        psd1_box.value = "";
        psd2_box.value = "";
        return;
    }
    if (psd1.length < 6){
        layer.alert('密码过于简单', {icon: 2});
        psd1_box.value = "";
        psd2_box.value = "";
        return;
    }
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(!reg.test(email)){
        layer.msg("邮箱格式错误！",function () {
        });
        email_box.value = "";
        return;
    }
    if (email == null || name == null || realm == null){
        layer.alert("缺乏某些信息", {icon: 2});
        return;
    }
    var json = {};
    json.phonenum = phonenum;
    json.username = phonenum;
    json.password = psd1;
    json.name = name;
    json.email = email;
    json.realm = realm;
    json.info = info;
    json.code = code_box.value;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/enterprise_add_action.action",
        data:JsonStr,
        dataType:"json",
        success:function(data){
            if(data.res_code == 0){
                // alert('成功' + data.res_str);
                window.location.href=encodeURI("./loginE.html?prefix=" + phonenum);
            }else{
                layer.alert("该手机号已被注册", {icon: 2});
            }
        },
        error:function(data){
            layer.msg("网络连接异常",function () {
            });
        }
    })
}

function goUser() {
    window.location.href=encodeURI("./register.html");
}