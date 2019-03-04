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
var sign_box = null;


// area 2
var citi1_box = null;
var citi2_box = null;

// area 3
var QQ_box = null;
var weixin_box = null;
var weibo_box = null;


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
var layer = null;

function onLoad() {
    layui.use('layer', function(){
        layer = layui.layer;
    });
    // get the username first
    username = getQueryString("username");

    document.getElementById("go_main").href = "./index.html?enterprise_username=" + username + "&nickname=" + getUrlParamCN("nickname");
    document.getElementById("go_success").href = "./success.html?enterprise_username=" + username;
    document.getElementById("go_task").href = "./newtask.html?enterprise_username=" + username;
    document.getElementById("go_task").innerText = "发布任务";
    document.getElementById("go_rank").href = "./rank.html?enterprise_username=" + username;
    document.getElementById("go_masterpiece").href = "./viewm.html?enterprise_username=" + username;

    // ajax get all of the property of user
    var json = {};
    var result1 = null;
    json.username = username;
    var JsonStr = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/enterprise_get_info.action",
        data:JsonStr,
        dataType:"json",

        success:function(data){
            result1 = data;
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    });
    console.log(result1);

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

    nickname_box = document.getElementById("name");
    if ('name' in result1){
        nickname_box.value = result1.name;
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

    realm_box = document.getElementById("realm");
    if ('realm' in result1){
        realm_box.value = result1.realm;
    } else {
        realm_box.value = "";
    }

    sign_box = document.getElementById("info");
    if ('info' in result1){
        sign_box.value = result1.info;
    } else {
        sign_box.value = "";
    }

    count1_box = document.getElementById("count1");
    count2_box = document.getElementById("count2");
    count3_box = document.getElementById("count3");
    count4_box = document.getElementById("count4");
    count5_box = document.getElementById("count5");

    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;

    var json11 = {};
    json11.username = username;
    var JsonStr11 = JSON.stringify(json);
    $.ajax({
        async:false,
        type:"post",
        contentType: "application/json; charset=utf-8",
        url:"http://" + serverPath + "/task_get_by_enterprise.action",
        data:JsonStr11,
        dataType:"json",

        success:function(data){
            console.log(data);
            List = data.list;
        },
        error:function(data){
            layer.msg("网络连接异常");
        }
    });

    var free_area = document.getElementById("free_area");
    for (var j=0; j<List.length; j++){
        count1++;
        var Str = "";
        var NodeStr = '<td onclick="goWork(' + j + ')">' + List[j].title + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].property + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].num_join + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">￥' + List[j].money + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].num_view + '</td>\n' +
            '          <td onclick="goWork(' + j + ')">' + List[j].num_share + '</td>\n';
        if (List[j].stage == 0 && List[j].time1 > 0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-blue" style="font-size: 22px;height: 40px;padding-top: 10px;">发布完成</td>';
        } else if(List[j].stage == 0 && List[j].time1 < 0 ){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-green" style="font-size: 22px;height: 40px;padding-top: 10px;">企业筛选中</span></td>';
            count3++;
        }  else if (List[j].stage == 1 && List[j].time2 >0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-blue" style="font-size: 22px;height: 40px;padding-top: 10px;">筛选完成</span></td>';
            count5++;
        } else if (List[j].stage == 1 && List[j].time2 <0){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-red" style="font-size: 22px;height: 40px;padding-top: 10px;">宣传阶段</span></td>';
            count4++;
        } else if (List[j].stage == 2){
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-orange" style="font-size: 22px;height: 40px;padding-top: 10px">任务已经完成</span></td>';
            count2++;
        } else {
            Str = '<td onclick="goWork('+ j +')"><span class="layui-badge layui-bg-green" style="font-size: 22px;height: 40px;padding-top: 10px;">宣传阶段</span></td>';
            count5++;
        }
        NodeStr += Str;
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }

    count1_box.value = count1;
    count2_box.value = count2;
    count3_box.value = count3;
    count4_box.value = count4;
    count5_box.value = count5;
}

function onChange1() {
    if (is_change_1 == false){
        is_change_1 = true;
        // transform into green
        email_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        nickname_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        realm_box.parentNode.parentNode.style.border = "4px solid #4ecf79";
        sign_box.parentNode.parentNode.style.border = "4px solid #4ecf79";


        email_box.style.border = "1px solid #4ecf79";
        email_box.style.borderWidth = "0px 1px 1px 0px";
        realm_box.style.border = "1px solid #4ecf79";
        realm_box.style.borderWidth = "0px 1px 0px 0px";
        nickname_box.style.border = "1px solid #4ecf79";
        nickname_box.style.borderWidth = "1px 1px 1px 0px";
        sign_box.style.border = "1px solid #4ecf79";
        sign_box.style.borderWidth = "1px 1px 1px 0px";

        document.getElementById("b1").value = "保存修改";

        email_box.disabled = "";
        nickname_box.disabled = "";
        realm_box.disabled = "";
        sign_box.disabled = "";

    } else {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(!reg.test(email_box.value)){
            layer.alert('邮箱不合法', {icon: 2});
            return;
        }
        if (nickname_box.value.length >= 32){
            layer.alert('企业名长度过长', {icon: 2});
            return;
        }
        if (nickname_box.value.length >= 32){
            layer.alert('公司长度过长', {icon: 2});
            return;
        }
        if (realm_box.value.length >= 32){
            layer.alert('地址长度过长', {icon: 2});
            return;
        }

        // ajax to the server
        var json = {};
        json.username = username;
        json.realm = realm_box.value;
        json.email = email_box.value;
        json.name = nickname_box.value;
        json.info = sign_box.value;
        var JsonStr = JSON.stringify(json);
        $.ajax({
            async:false,
            type:"post",
            contentType: "application/json; charset=utf-8",
            url:"http://" + serverPath + "/enterprise_change_info.action",
            data:JsonStr,
            dataType:"json",

            success:function(data){
                // console.log(data.res_str);
                is_change_1 = false;

                // transform to grey
                email_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                nickname_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                realm_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";
                sign_box.parentNode.parentNode.style.border = "2px solid #8d8d8d";

                email_box.style.border = "";
                email_box.style.borderWidth = "";
                realm_box.style.border = "";
                realm_box.style.borderWidth = "";
                nickname_box.style.border = "";
                nickname_box.style.borderWidth = "x";
                sign_box.style.border = "";
                sign_box.style.borderWidth = "";

                email_box.disabled = "disabled";
                nickname_box.disabled = "disabled";
                realm_box.disabled = "disabled";
                sign_box.disabled = "disabled";

                document.getElementById("b1").value = "修改个人资料";
                layer.alert('修改成功', {icon: 6});

            },
            error:function(data){
                layer.msg("网络连接异常");
            }
        })

    }

}

// change The psd
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
            url:"http://" + serverPath + "/enterprise_change_password.action",
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
                url:"http://" + serverPath + "/enterprise_bind_citi.action",
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
                            area: ['800px', '600px'],
                            content: './subwindow2.html?str=' + info.toString() + "&acc=" + account_id.toString() + "&username=" + username
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

function goWork(j) {
    if (List[j].stage == 0){
        window.open('./choose.html?task_id=' + List[j].id + '&enterprise_username=' + username);
    } else if (List[j].stage == 1){
        window.open('./score.html?task_id=' + List[j].id + '&enterprise_username=' + username);
    } else {
        // task is finished
        layer.alert("任务" + List[j].title + "设计工作已全部完成",{icon:6})
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
