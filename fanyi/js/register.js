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
        url:"http://" + serverPath + "/designer_get_code.action",
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
        layer.msg('没有同意遵守《用户入驻协议》', function(){
        });
        return null;
    }
    var phonenum_box = document.getElementById("phonenum");
    var code_box = document.getElementById("code");
    var psd1_box = document.getElementById("password1");
    var psd2_box = document.getElementById("password2");
    var phonenum = phonenum_box.value;
    var psd1 = psd1_box.value;
    var psd2 = psd2_box.value;
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
    var json = {};
    json.phonenum = phonenum;
    json.username = phonenum;
    json.password = psd1;
    json.code = code_box.value;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:true,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_add_action.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            if(data.res_code == 0){
                // alert('成功' + data.res_str);
                window.location.href=encodeURI("./login.html?prefix=" + phonenum);
            }else{
                layer.alert("该手机号已被注册", {icon: 2});
            }
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    })
}

function goEnterprise() {
    window.location.href=encodeURI("./registerE.html");
}
