var serverPath = "localhost:8080";

var base_data = null;
var free_area = null;

var dusername = null;
var eusername = null;

function onLoad() {
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
        url:"http://" + serverPath + "/get_rank_designer.action",
        data:JsonStr0,
        dataType:"json",

        success:function(data){
            // console.log(data);
            base_data = data.result;
            console.log(base_data);
        },
        error:function(data){
            layer.msg("网络异常...")
        }
    });
    base_data.sort(function (a,b) {
        if (a.share < b.share){
            return 1;
        } else {
            return -1;
        }
    });
    free_area = document.getElementById("free_area");
    for (var j=0;j<5;j++){
        var NodeStrHead = '<div class="advertise-list">\n' +
            '        <div class="alnumb">\n' +
            '            ' + (j+1) +'\n' +
            '        </div>\n' +
            '        <div class="alld">\n' +
            '            <h4 style="color: #585858;margin: 35px;">' + base_data[j].designer_name+ '</h4>\n' +
            '            <h5 style="margin: 35px;"><span href="#" style="color: #afb0aa;margin-right: 20px;">转发数：' + base_data[j].share + ' </span> ' +
            '            <span href="#" style="color: #e66f35;margin-right: 20px;">获赞数：' + base_data[j].view + ' </span> </h5>\n' +
            '            <input type="button" value="关注">\n' +
            '            <input type="button" value="给他留言" style="background-color: #fff;color:#797979;border: 1px #797979 solid">\n' +
            '        </div>\n' +
            '        <div class="alid">\n';
        for (var k =0 ; k<base_data[j].img.length;k++){
            NodeStrHead += '<img src="' +"http://" + serverPath + "/Masterpiece/" + base_data[j].img[k] + '">'
        }
        NodeStrHead  += '        </div>\n' +
            '    </div>';
        var Node = document.createElement("div");
        Node.innerHTML = NodeStrHead;
        free_area.appendChild(Node);
    }
}

function clickRankOne() {
    base_data.sort(function (a,b) {
        if (a.share < b.share){
            return 1;
        } else {
            return -1;
        }
    });
    free_area.innerHTML = "";
    for (var j=0;j<5;j++){
        var NodeStrHead = '<div class="advertise-list">\n' +
            '        <div class="alnumb">\n' +
            '            ' + (j+1) +'\n' +
            '        </div>\n' +
            '        <div class="alld">\n' +
            '            <h4 style="color: #585858;margin: 35px;">' + base_data[j].designer_name+ '</h4>\n' +
            '            <h5 style="margin: 35px;"><span href="#" style="color: #afb0aa;margin-right: 20px;">转发数：' + base_data[j].share + ' </span> ' +
            '            <span href="#" style="color: #e66f35;margin-right: 20px;">获赞数：' + base_data[j].view + ' </span> </h5>\n' +
            '            <input type="button" value="关注">\n' +
            '            <input type="button" value="给他留言" style="background-color: #fff;color:#797979;border: 1px #797979 solid">\n' +
            '        </div>\n' +
            '        <div class="alid">\n';
        for (var k =0 ; k<base_data[j].img.length;k++){
            NodeStrHead += '<img src="' +"http://" + serverPath + "/Masterpiece/" + base_data[j].img[k] + '">'
        }
        NodeStrHead  += '        </div>\n' +
            '    </div>';
        var Node = document.createElement("div");
        Node.innerHTML = NodeStrHead;
        free_area.appendChild(Node);
    }
}

function clickRankTwo() {
    base_data.sort(function (a,b) {
        if (a.view < b.view){
            return 1;
        } else {
            return -1;
        }
    });
    free_area.innerHTML = "";
    for (var j=0;j<5;j++){
        var NodeStrHead = '<div class="advertise-list">\n' +
            '        <div class="alnumb">\n' +
            '            ' + (j+1) +'\n' +
            '        </div>\n' +
            '        <div class="alld">\n' +
            '            <h4 style="color: #585858;margin: 35px;">' + base_data[j].designer_name+ '</h4>\n' +
            '            <h5 style="margin: 35px;"><span href="#" style="color: #afb0aa;margin-right: 20px;">转发数：' + base_data[j].share + ' </span> ' +
            '            <span href="#" style="color: #e66f35;margin-right: 20px;">获赞数：' + base_data[j].view + ' </span> </h5>\n' +
            '            <input type="button" value="关注">\n' +
            '            <input type="button" value="给他留言" style="background-color: #fff;color:#797979;border: 1px #797979 solid">\n' +
            '        </div>\n' +
            '        <div class="alid">\n';
        for (var k =0 ; k<base_data[j].img.length;k++){
            NodeStrHead += '<img src="' +"http://" + serverPath + "/Masterpiece/" + base_data[j].img[k] + '">'
        }
        NodeStrHead  += '        </div>\n' +
            '    </div>';
        var Node = document.createElement("div");
        Node.innerHTML = NodeStrHead;
        free_area.appendChild(Node);
    }
}

function getUrlParamCN(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}