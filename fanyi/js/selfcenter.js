var username = null;
var nickname = null;
var serverPath = "localhost:8080";

// area 1
var username_box = null;
var email_box = null;
var nickname_box = null;
var realname_box = null;
var sex_box = null;
var birth_box = null;
var realm_box = null;
var identity_box = null;
var shift_box = null;

// area 2
var citi1_box = null;
var citi2_box = null;

// area 3
var QQ_box = null;
var weixin_box = null;
var weibo_box = null;

// area 4
var sign_box = null;
var exp1_box = null;
var exp2_box = null;
var exp3_box = null;

// area 5
var exp_box = null;
var level_box = null;
var credit_box = null;
var count1_box = null;
var count2_box = null;
var count3_box = null;
var count4_box = null;
var count5_box = null;

// area new psd
var psd1_box = null;
var psd2_box = null;

var is_change_1 = false;
var is_change_2 = false;
var is_change_3 = false;
var is_change_c = false;
var List = null;
var layer = null;

function onLoad() {
    layui.use('layer', function(){
        layer = layui.layer;
    });
    // init the progressbar
    $('#progressbar1').LineProgressbar({
        percentage: 50,
        height: '20px',
        radius: '10px',
        backgroundColor: '#FFFFF',
        width : '100%'
    });

    // get the username first
    username = getQueryString("username");

    document.getElementById("go_main").href = "./index.html?designer_username=" + username + "&nickname=" + getUrlParamCN("nickname");
    document.getElementById("go_success").href = "./success.html?designer_username=" + username;
    document.getElementById("go_task").href = "./viewtask.html?designer_username=" + username;
    document.getElementById("go_rank").href = "./rank.html?designer_username=" + username;
    document.getElementById("go_masterpiece").href = "./viewm.html?designer_username=" + username;

    // ajax get all of the property of user
    var json = {};
    var result1 = null;
    var result2 = null;
    var result3 = null;
    json.username = username;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_property_get.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            result1 = data;
        },
        error:function(data){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.msg("网络连接异常");
            });

        }
    })
    if (result1.designer == true){
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/designer_exp_get.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                result2 = data;
            },
            error:function(data){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg("网络连接异常");
                });
            }
        });
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/masterpiece_get_by_designer.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                result3 = data;
            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        });
    }

    psd1_box = document.getElementById("psd1");
    psd2_box = document.getElementById("psd2");

    username_box = document.getElementById("username");
    username_box.value = result1.username;

    email_box = document.getElementById("email");
    if ('email' in result1){
        email_box.value = result1.email;
    } else {
        email_box.value = "";
    }

    nickname_box = document.getElementById("nickname");
    if ('nickname' in result1){
        nickname_box.value = result1.nickname;
    } else {
        nickname_box.value = "";
    }

    citi1_box = document.getElementById("citi_A");
    if ('citi' in result1){
        citi1_box.value = result1.citi;
    } else {
        citi1_box.value = "";
    }

    citi2_box = document.getElementById("citi_C");
    if ('citi_num' in result1){
        citi2_box.value = result1.citi_num;
    } else {
        citi2_box.value = "";
    }

    realname_box = document.getElementById("realname");
    if ('realname' in result1){
        realname_box.value = result1.realname;
    } else {
        realname_box.value = "";
    }

    sex_box = document.getElementById("sex");
    if ('sex' in result1){
        if (result1.sex == 1){
            sex_box.value = "男";
        } else if (result1.sex == 2){
            sex_box.value = "女";
        } else {
            sex_box.value = "保密";
        }
    } else {
        sex_box.value = "保密";
    }

    birth_box = document.getElementById("birthday");
    if ('birthday' in result1){
        birth_box.value = result1.birthday;
    }

    realm_box = document.getElementById("realm");
    if ('realm' in result1){
        realm_box.value = result1.realm;
    } else {
        realm_box.value = "";
    }

    identity_box = document.getElementById("role");
    if (result1.designer == true){
        identity_box.value = "设计师";
    } else {
        identity_box.value = "普通用户";
    }

    QQ_box = document.getElementById("qq");
    if ('qq' in result1){
        QQ_box.value = result1.qq;
    } else {
        QQ_box.value = "";
    }

    weixin_box = document.getElementById("weixin");
    if ('weixin' in result1){
        weixin_box.value = result1.weixin;
    } else {
        weixin_box.value = "";
    }

    weibo_box = document.getElementById("weibo");
    if ('weibo' in result1){
        weibo_box.value = result1.weibo;
    } else {
        weibo_box.value = "暂未绑定";
    }

    sign_box = document.getElementById("sign");
    if ('sign' in result1){
        sign_box.value = result1.sign;
    } else {
        // sign_box.value = "没有留下签名";
        sign_box.value = "";
    }

    exp1_box = document.getElementById("sign1");
    if ('exp_work' in result1){
        exp1_box.value = result1.exp_work;
    } else {
        // exp1_box.value = "没有留下经历";
        exp1_box.value = "";
    }

    exp2_box = document.getElementById("sign2");
    if ('exp_edu' in result1){
        exp2_box.value = result1.exp_edu;
    } else {
        // exp2_box.value = "没有留下经历";
        exp2_box.value = "";
    }

    exp3_box = document.getElementById("sign3");
    if ('exp_prise' in result1){
        exp3_box.value = result1.exp_prise;
    } else {
        // exp3_box.value = "没有留下经历";
        exp3_box.value = "";
    }

    credit_box = document.getElementById("credit");
    if ('credit' in result1){
        credit_box.value = result1.credit;
    } else {
        credit_box.value = "0";
    }

    exp_box = document.getElementById("exp");
    level_box = document.getElementById("rank");
    count1_box = document.getElementById("count1");
    count2_box = document.getElementById("count2");
    count3_box = document.getElementById("count3");
    count4_box = document.getElementById("count4");
    count5_box = document.getElementById("count5");

    if (result1.designer == true){
        exp_box.value = result2.Exp;
        level_box.value = "Lv." + parseInt(result2.Exp/100);
        $('#progressbar1').LineProgressbar({
            percentage: result2.Exp % 100,
            height: '20px',
            radius: '10px',
            backgroundColor: '#FFFFF',
            width : '100%'
        });
        count1_box.value = result3.result.length;
        var num_fin = 0;
        var num_share = 0;
        var num_view = 0;
        var num_like = 0;

        for (j = 0; j< result3.result.length ; j++){
            if (result3.result[j].stage >= 3){
                num_fin ++;
                num_view += result3.result[j].view;
                num_like += result3.result[j].likes;
                num_share+= result3.result[j].share;
            }
        }
        count2_box.value = num_fin;
        count3_box.value = num_share;
        count4_box.value = num_like;
        count5_box.value = num_view;

        // UNABLE the shift box
        shift_box = document.getElementById("b_shift");
        shift_box.style.borderColor = "#8d8d8d";
        shift_box.style.color = "#8d8d8d";
        shift_box.style.cursor = "Default";
        shift_box.onclick = "";

    } else {
        $('#progressbar1').LineProgressbar({
            percentage: 0,
            height: '20px',
            radius: '10px',
            backgroundColor: '#FFFFF',
            width : '100%'
        });
        level_box.value = "请先激活为设计师";
        exp_box.value = "普通用户";
        count1_box.value = "请先激活为设计师";
        count2_box.value = "请先激活为设计师";
        count3_box.value = "请先激活为设计师";
        count4_box.value = "请先激活为设计师";
        count5_box.value = "请先激活为设计师";
    }

    var json11 = {};
    json11.username = username;
    var JsonStr11 = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/masterpiece_get_by_designer.action",
        data:JsonStr11,
        dataType:"json",

        success:function(data){
            console.log(data);
            List = data.result;
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    })
    var free_area = document.getElementById("free_area");
    for (var j=0; j<List.length; j++){
        var Str = "";
        var NodeStr = '<td onclick="goWork(' + j + ')">' + List[j].title + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].view + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].share + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].likes + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">￥' + List[j].money + '</td>\n';
        if (List[j].stage == 0 && List[j].time1 > 0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge" style="font-size: 22px;height: 40px;padding-top: 10px;background-color: #00F7DE">已成功报名</td>';
        } else if(List[j].stage == 0 && List[j].time1 < 0 ){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-cyan" style="font-size: 22px;height: 40px;padding-top: 10px;">企业筛选中</span></td>';
        } else if (List[j].stage == 0 && List[j].time1 < 0 && List[j].time2 < 0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-red" style="font-size: 22px;height: 40px;padding-top: 10px;">审核未通过</span></td>';
        } else if (List[j].stage == 1 && List[j].time2 >0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-blue" style="font-size: 22px;height: 40px;padding-top: 10px;">审核已通过</span></td>';
        } else if (List[j].stage == 1 && List[j].time2 <0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-green" style="font-size: 22px;height: 40px;padding-top: 10px;">宣传阶段</span></td>';
        } else if (List[j].stage == 2){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-orange" style="font-size: 22px;height: 40px;padding-top: 10px">任务已经完成</span></td>';
        } else {
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-green" style="font-size: 22px;height: 40px;padding-top: 10px;">宣传阶段</span></td>';
        }
        //Math.random() > 0.5
        console.log(List[j].copy.length);
        if(List[j].copy.length < 2){
            Str += '<td onclick="goSafe('+ j +')"><span class="layui-badge layui-bg-green" style="font-size: 22px;height: 40px;padding-top: 10px;">作品安全</span></td>';
        } else {
            Str += '<td onclick="goSafe('+ j +')"><span class="layui-badge layui-bg-red" style="font-size: 22px;height: 40px;padding-top: 10px;">侵权警告</span></td>';
        }
        NodeStr += Str;
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }
}

function onChange1() {
    if (is_change_1 == false){
        is_change_1 = true;
        // transform into green
        email_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        nickname_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        realname_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        realm_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        sex_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        birth_box.parentNode.parentNode.style.border = "4px solid #4ecf79";

        realname_box.style.border = "1px solid #4ecf79";
        realname_box.style.borderWidth = "1px 1px 1px 0px";
        email_box.style.border = "1px solid #4ecf79";
        email_box.style.borderWidth = "1px 1px 1px 0px";
        realm_box.style.border = "1px solid #4ecf79";
        realm_box.style.borderWidth = "0px 1px 1px 0px";
        sex_box.style.border = "1px solid #4ecf79";
        sex_box.style.borderWidth = "0px 1px 0px 0px";
        nickname_box.style.border = "1px solid #4ecf79";
        nickname_box.style.borderWidth = "1px 1px 1px 0px";
        birth_box.style.border = "1px solid #4ecf79";
        birth_box.style.borderWidth = "0px 1px 0px 0px";

        document.getElementById("b1").value = "保存修改";

        email_box.disabled = "";
        nickname_box.disabled = "";
        realname_box.disabled = "";
        realm_box.disabled = "";
        sex_box.disabled = "";
        birth_box.disabled = "";

    } else {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(!reg.test(email_box.value)){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.alert('邮箱不合法', {icon: 2});
            });
            return;
        }
        if (realname_box.value.length >= 32){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.alert('真实姓名长度过长', {icon: 2});
            });
            return;
        }
        if (nickname_box.value.length >= 32){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.alert('昵称长度过长', {icon: 2});
            });

            return;
        }
        if (sex_box.value != '男' && sex_box.value != '女'){
            layer.alert('性别不合法', {icon: 2});
            return;
        }
        if (realname_box.value.length >= 32){
            layer.alert('地址长度过长', {icon: 2});
            return;
        }

        // ajax to the server
        var json = {};
        json.username = username;
        json.realm = realm_box.value;
        json.email = email_box.value;
        json.realname = realname_box.value;
        json.birthday = birth_box.value;
        json.nickname = nickname_box.value;
        if (sex_box.value == "男"){
            json.sex = 1;
        } else if (sex_box.value == "女") {
            json.sex = 2;
        } else {
            json.sex = 3;
        }
        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/designer_info_update.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                // console.log(data.res_str);
                is_change_1 = false;

                // transform to grey
                email_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                nickname_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                realname_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                realm_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                sex_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                birth_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";

                realname_box.style.border = "";
                realname_box.style.borderWidth =  "";
                email_box.style.border = "";
                email_box.style.borderWidth =  "";
                realm_box.style.border = "";
                realm_box.style.borderWidth =  "";
                sex_box.style.border = "";
                sex_box.style.borderWidth =  "";
                nickname_box.style.border = "";
                nickname_box.style.borderWidth = "";
                birth_box.style.border = "";
                birth_box.style.borderWidth =  "";

                email_box.disabled = "disabled";
                nickname_box.disabled = "disabled";
                realname_box.disabled = "disabled";
                realm_box.disabled = "disabled";
                sex_box.disabled = "disabled";
                birth_box.disabled = "disabled";

                document.getElementById("b1").value = "修改个人资料";
                layer.alert('修改成功', {icon: 6});

            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        })

    }

}

function onChange2() {
    if (is_change_2 == false){
        is_change_2 = true;
        QQ_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        weibo_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        weixin_box.parentNode.parentNode.style.border = "4px solid #4ecf79";

        QQ_box.style.border = "1px solid #4ecf79";
        QQ_box.style.borderWidth = "1px 1px 1px 0px";
        weixin_box.style.border = "1px solid #4ecf79";
        weixin_box.style.borderWidth = "0px 1px 0px 0px";
        weibo_box.style.border = "1px solid #4ecf79";
        weibo_box.style.borderWidth = "0px 1px 0px 0px";

        QQ_box.disabled = "";
        weibo_box.disabled = "";
        weixin_box.disabled = "";

        document.getElementById("b2").value = "保存修改";

    } else {
        var reg=/^\d{5,10}$/;
        if(!reg.test(QQ_box.value)){
            layer.alert('QQ号不合法', {icon: 2});
            return;
        }
        reg = /^[a-zA-Z\d_]{5,}$/;
        if(!reg.test(weixin_box.value)){
            layer.alert('微信号不合法', {icon: 2});
            return;
        }
        if (weibo_box.value.length >= 32){
            layer.alert('微博不合法', {icon: 2});
            return;
        }
        // ajax to the server
        var json = {};
        json.username = username;
        json.weixin = weixin_box.value;
        json.qq = QQ_box.value;
        json.weibo = weibo_box.value;
        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/designer_info_update.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                // console.log(data.res_str);
                is_change_2 = false;

                // transform to grey
                QQ_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                weibo_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                weixin_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";

                QQ_box.style.border = "";
                QQ_box.style.borderWidth =  "";
                weibo_box.style.border = "";
                weibo_box.style.borderWidth =  "";
                weixin_box.style.border = "";
                weixin_box.style.borderWidth =  "";

                QQ_box.disabled = "disabled";
                weibo_box.disabled = "disabled";
                weixin_box.disabled = "disabled";

                document.getElementById("b2").value = "更改第三方平台绑定";
                layer.alert('修改绑定成功', {icon: 6});

            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        })
    }
}

function onchange3() {
    if (is_change_3 == false){
        is_change_3 = true;
        sign_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        exp1_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        exp2_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        exp3_box.parentNode.parentNode.style.border = "4px solid #4ecf79";

        sign_box.style.border = "1px solid #4ecf79";
        sign_box.style.borderWidth = "0px 1px 0px 0px";
        exp1_box.style.border = "1px solid #4ecf79";
        exp1_box.style.borderWidth = "0px 1px 0px 0px";
        exp2_box.style.border = "1px solid #4ecf79";
        exp2_box.style.borderWidth = "1px 1px 1px 0px";
        exp3_box.style.border = "1px solid #4ecf79";
        exp3_box.style.borderWidth = "1px 1px 1px 0px";

        sign_box.disabled = "";
        exp1_box.disabled = "";
        exp2_box.disabled = "";
        exp3_box.disabled = "";

        document.getElementById("info1").style.visibility = "visible";
        document.getElementById("b2").value = "保存修改";

    } else {
        if (sign_box.value.length >= 40){
            layer.alert('签名过长', {icon: 2});
            return;
        }
        if (exp1_box.value.length >= 40){
            layer.alert('工作经历过长', {icon: 2});
            return;
        }
        if (exp2_box.value.length >= 40){
            layer.alert('教育经历过长', {icon: 2});
            return;
        }
        if (exp3_box.value.length >= 40){
            layer.alert('曾获奖励过长', {icon: 2});
            return;
        }

        // ajax to the server
        var json = {};
        json.username = username;
        json.sign = sign_box.value;
        json.exp_work = exp1_box.value;
        json.exp_edu = exp2_box.value;
        json.exp_prise = exp2_box.value;
        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/designer_extend_info_update.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                // console.log(data.res_str);
                is_change_3 = false;

                // transform to grey
                sign_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                exp1_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                exp2_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                exp3_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";

                sign_box.style.border = "";
                sign_box.style.borderWidth =  "";
                exp1_box.style.border = "";
                exp1_box.style.borderWidth =  "";
                exp2_box.style.border = "";
                exp2_box.style.borderWidth =  "";
                exp3_box.style.border = "";
                exp3_box.style.borderWidth =  "";

                sign_box.disabled = "disabled";
                exp1_box.disabled = "disabled";
                exp2_box.disabled = "disabled";
                exp3_box.disabled = "disabled";

                document.getElementById("b3").value = "修改信息";

                document.getElementById("info1").style.visibility = "hidden";

                layer.alert('修改成功', {icon: 6});

            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        })
    }
}

function onChange4() {
    if (psd1_box.value != psd2_box.value){
        layer.alert('两次输入密码不一致', {icon: 2});
        return;
    }
    // new rule of password can be add to here
    if (psd1_box.value < 6){
        layer.alert('密码过于简单', {icon: 2});
        return;
    }

    layer.prompt({
        formType: 0,
        value: '',
        title: '请输入原密码',
        formType: 1,
    }, function(value,index){
        // ajax to the server
        var json = {};
        json.username = username;
        json.newpassword = psd1_box.value;
        json.password = value;

        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/designer_change_password.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                if (data.res_code == 0){
                    layer.alert('修改成功', {icon: 6});
                    layer.close(index);
                    psd1_box.value = "";
                    psd2_box.value = "";
                } else {
                    layer.alert('原密码错误',{icon: 2});
                    layer.close(index);
                }
            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        })
    });

}

function onChange5() {
    if (is_change_c == false){
        is_change_c = true;
        citi1_box.parentNode.parentNode.style.border = "4px solid #053070";
        citi1_box.style.border = "1px solid #053070";
        citi1_box.style.borderWidth = "0px 1px 0px 0px";
        citi1_box.disabled = "";

        document.getElementById("b7").value = "点击确定";
    } else {
        if (citi1_box.value.length < 6){
            layer.msg("请输入有效账号",{icon: 2});
            return;
        }

        layer.prompt({
            formType: 1,
            value: '',
            title: '请输银行账号的密码',
        }, function(value,index){
            // ajax to the server
            var json = {};
            json.username = username;
            json.username_citi = citi1_box.value;
            json.password = value;
            var JsonStr = JSON.stringify(json);
            $.ajax({
                async:true,
                type:"post",
                contentType: "application/json; charset=utf-8",
                url:"http://" + serverPath + "/designer_bind_citi.action",
                data:JsonStr,
                dataType:"json",

                success:function(data){
                    if (data.res_code == 0){
                        var result = JSON.parse(data.res_str);
                        var acc = result.accountGroupSummary[0].accounts;
                        var disp = new Array();
                        var info = new Array();
                        var account_id = new Array();
                        // console.log(acc);
                        for ( j = 0; j< acc.length ; j++){
                            if ("savingsAccountSummary" in acc[j]){
                                info.push("账户类型：" + acc[j].savingsAccountSummary.productName + "  "
                                    + "账户尾号：" + acc[j].savingsAccountSummary.displayAccountNumber);
                                account_id.push(acc[j].savingsAccountSummary.accountId);

                                disp.push(acc[j].savingsAccountSummary.displayAccountNumber);
                            }
                        }
                        layer.open({
                            type: 2,
                            title: '指定一个花旗银行账户',
                            shadeClose: true,
                            shade: 0.6,
                            maxmin: true, //开启最大化最小化按钮
                            area: ['700px', '500px'],
                            content: './subwindow1.html?str=' + info.toString() + "&acc=" + account_id.toString() + "&username=" + username
                            + "&disp=" + disp.toString(),
                            end: function () {
                                location.reload();
                            }

                        });

                        // layer.alert('绑定成功', {icon: 6});
                        layer.closeAll('loading');
                    } else {
                        layer.alert('密码错误',{icon: 2});
                        layer.closeAll('loading');

                    }

                },
                error:function(data){
                    layer.msg("网络连接异常");
                }
            });
            top.layer.load(2);

            is_change_c = false;
            citi1_box.style.border = "";
            citi1_box.style.borderWidth = "";
            citi1_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
            citi1_box.disabled = "disabled";
            document.getElementById("b7").value = "绑定／更改绑定";

            layer.close(index);

        });
    }
}

function goMain() {
    window.location.href='./index.html?username=' + username + '&nickname=' + nickname_box.value;
}

function shift() {

    var check = document.getElementById('check').checked;
    if (check == false){
        layer.msg('没有同意遵守《泛意设计师协议》', function(){
        });
        return null;
    }
    // ajax to the server
    var json = {};
    json.username = username;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/designer_shift.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            // console.log(data.res_str);
            if (data.res_code == 0){
                layer.alert('已成功提交激活请求，请等待3-5个工作日',{icon: 6},);
            } else {
                layer.alert('激活失败,某些信息填写不全',{icon: 2});
            }
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    })
}

function goWork(j) {
    if(List[j].stage == 2){
        window.open('./step4.html?m_id=' + List[j].id + '&designer_username=' + username);
    } else {
        window.open('./step3.html?m_id=' + List[j].id + '&designer_username=' + username);
    }
}

function goSafe(j) {
    if (List[j].copy.length < 2){
        layer.alert("作品安全",{icon:6});
    } else {
        layer.alert("泛意提醒您：监测到疑似侵权：<br><a href='https://new.qq.com/omn/20181013A0LQ9K00'>https://new.qq.com/omn/20181013A0LQ9K00</a>",{icon:0});
    }
    console.log(j);
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
