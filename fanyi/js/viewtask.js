var base_data = null;
var designer_username = null;
var in_view = new Array();

var free_area = null;
var now_active_sort = 1;
var now_active_class = 1;
var show_end = false;

var dusernmae= null;
var eusername = null;

var serverPath = "localhost:8080";

function onLoad() {
    designer_username = getUrlParamCN("designer_username");

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
            base_data = data.list;
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });

    var now = new Date();
    for (var j=0; j<base_data.length; j++){
        var end = new Date(base_data[j].end_day);
        var start = new Date(base_data[j].start_day);
        var re = end.getTime() - now.getTime();
        var re2 = start.getTime() - now.getTime();
        var re3 = end.getTime() - start.getTime();
        if (re > 0){
            base_data[j].is_end = false;
            base_data[j].remain_days = re/(1000 * 60 * 60 * 24);
        } else {
            base_data[j].is_end = true;
        }
        base_data[j].begin_day = re2/(1000 * 60 * 60 * 24);
        base_data[j].last = re3;
        if (re2 < 0){
            base_data[j].str1 = "天前";
        } else {
            base_data[j].str1 = "天后";
        }
    }

    free_area = document.getElementById("free_area");
    in_view.length = 0;
    // default sort
    for (var j=0; j<base_data.length; j++){
        if (base_data[j].class.indexOf("产品广告") != -1 &&
            base_data[j].is_end == false){
            in_view.push(base_data[j]);
        }
    }
    in_view.sort(function (obj1, obj2) {
        if (obj1.begin_day < obj2.begin_day){
            return -1;
        } else {
            return 1;
        }
    });

    for (var j=0; j<in_view.length; j++){
        var day1 = Math.abs(parseInt(in_view[j].begin_day));
        var day_str1 = null;
        if (day1 == 0){
            day_str1 = "今天";
        } else {
            day_str1 = day1 + in_view[j].str1
        }
        var tar_str = "\"./step2.html?designer_username=" + designer_username + "&task_id=" + in_view[j].id + "\"";
        var NodeStr = '\n' +
            '            <td onclick="onViewTask('+ j +')">' + in_view[j].title + '</td>\n' +
            '            <td onclick="onViewTask('+ j +')">' + day_str1 + '</td>\n' +
            '            <td onclick="onViewTask('+ j +')">&nbsp;' + in_view[j].property.toFixed(2) + '</td>\n' +
            '            <td onclick="onViewTask('+ j +')">￥'+ in_view[j].money + '</td>\n' +
            '            <td onclick="onViewTask('+ j +')"><strong>' + in_view[j].num_join + '</strong>人已报名|<strong>' + parseInt(in_view[j].remain_days) + '</strong>天后截止</td>\n' +
            '            ';
        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;


        free_area.appendChild(Node);
    }

}

function onClassChange(j) {
    free_area.innerHTML = "";
    if (j != now_active_class){
        var last_active = document.getElementById("class" + now_active_class);
        var now_active = document.getElementById("class" + j);
        now_active.style.color = "#f2ffff";
        now_active.className = "checked";
        last_active.style.color = "#6c6c6c"
        last_active.className = "";
        now_active_class = j;
    }

    in_view.length = 0;
    if (j==1){
        for (var j=0; j<base_data.length; j++){
            if (base_data[j].class.indexOf("产品广告") != -1 &&
                base_data[j].is_end == show_end){
                in_view.push(base_data[j]);
            }
        }
    }
    if (j==2){
        for (var j=0; j<base_data.length; j++){
            if (base_data[j].class.indexOf("品牌广告") != -1 &&
                base_data[j].is_end == show_end){
                in_view.push(base_data[j]);
            }
        }
    }
    if (j==3){
        for (var j=0; j<base_data.length; j++){
            if (base_data[j].class.indexOf("观念广告") != -1 &&
                base_data[j].is_end == show_end){
                in_view.push(base_data[j]);
            }
        }
    }
    if (j==4){
        for (var j=0; j<base_data.length; j++){
            if (base_data[j].class.indexOf("公益广告") != -1 &&
                base_data[j].is_end == show_end){
                in_view.push(base_data[j]);
            }
        }
    }
    sortTask(now_active_sort);
    return false;
}

function sortTask(j) {
    free_area.innerHTML = "";
    // color change
    if (j != now_active_sort){
        var last_active = document.getElementById("sort" + now_active_sort);
        var now_active = document.getElementById("sort" + j);
        now_active.style.color = "#2493D3";
        last_active.style.color = "#6c6c6c";
        now_active_sort = j;
    }


    if (j == 1){
        in_view.sort(function (obj1, obj2) {
            if (obj1.begin_day < obj2.begin_day){
                return -1;
            } else {
                return 1;
            }
        });
    }
    if (j == 2){
        in_view.sort(function (obj1, obj2) {
            if (obj1.num_join < obj2.num_join){
                return 1;
            } else {
                return -1;
            }
        });
    }
    if (j == 3){
        in_view.sort(function (obj1, obj2) {
            if (obj1.last < obj2.last){
                return 1;
            } else {
                return -1;
            }
        });
    }
    if (j == 4){
        in_view.sort(function (obj1, obj2) {
            if (obj1.money < obj2.money){
                return 1;
            } else {
                return -1;
            }
        });
    }
    for (var j=0; j<in_view.length; j++){
        var day1 = Math.abs(parseInt(in_view[j].begin_day));
        var day_str1 = null;
        if (day1 == 0){
            day_str1 = "今天";
        } else {
            day_str1 = day1 + in_view[j].str1
        }
        if (show_end == false){
            // console.log("adwad");
            var NodeStr = '<tr onclick="onViewTask('+ j +')">\n' +
                '            <td onclick="onViewTask('+ j +')">' + in_view[j].title + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">' + day_str1 + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">&nbsp;' + in_view[j].property.toFixed(2) + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">￥'+ in_view[j].money + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')"><strong>' + in_view[j].num_join + '</strong>人已报名|<strong>' + parseInt(in_view[j].remain_days) + '</strong>天后截止</td>\n' +
                '        </tr>';
        } else {
            // console.log("123123");
            var NodeStr = '<tr onclick="onViewTask('+ j +')">\n' +
                '            <td onclick="onViewTask('+ j +')">' + in_view[j].title + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">' + day_str1 + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">&nbsp;' + in_view[j].property.toFixed(2) + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')">￥'+ in_view[j].money + '</td>\n' +
                '            <td onclick="onViewTask('+ j +')"><strong>' + in_view[j].num_join + '</strong>人已报名|<span style="color: #ff0000">报名已截止</span></td>\n' +
                '        </tr>';
        }

        var Node = document.createElement("tr");
        Node.innerHTML = NodeStr;
        free_area.appendChild(Node);
    }
    return false;
}

function onChangeEnd(j) {
    free_area.innerHTML = "";
    if (j == 1){
        var last_active = document.getElementById("end2");
        var now_active = document.getElementById("end1");
        now_active.style.color = "#f2ffff";
        now_active.className = "checked";
        last_active.style.color = "#6c6c6c"
        last_active.className = "";
        show_end = false;
    } else {
        var last_active = document.getElementById("end1");
        var now_active = document.getElementById("end2");
        now_active.style.color = "#f2ffff";
        now_active.className = "checked";
        last_active.style.color = "#6c6c6c"
        last_active.className = "";
        show_end = true;
    }
    onClassChange(now_active_class);
}

function onViewTask(j) {
    var dusername = getUrlParamCN("designer_username");
    var eusername = getUrlParamCN("enterprise_username");
    console.log(dusername);
    if(dusername != null){
        // console.log("1111");
        window.open("./step2.html?task_id=" + in_view[j].id + "&designer_username=" + dusername);
    } else if (eusername != null){
        window.open("./step2.html?task_id=" + in_view[j].id + "&enterprise_username=" + eusername);
    } else {
        // console.log("2222");
        window.open("./step2.html?task_id=" + in_view[j].id);
    }

}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
