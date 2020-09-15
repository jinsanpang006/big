// 入口
$(function () {
  // 数据
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $("#p-select").val(),
    state: $("#state-select").val(),
  };

  // aer- template 的 其他API方法(声明过滤器)
  template.defaults.imports.formaDate = function (a) {
    var timenew = moment(a).format("MMM Do YYYY , h:mm:ss a");
    return timenew;
  };

  // 渲染那一整行信息
  initTable();
  function initTable() {
    $.get("/my/article/list", q, function (res) {
      // console.log(res);
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
        renderPage(res.total);
      } else {
        layer.msg(res.message);
      }
    });
  }

  // 获取下拉框数据进行渲染
  initCate();
  function initCate() {
    $.get("/my/article/cates", function (res) {
      console.log(res);
      var strHtml = template("tpl-cate", res);
      $("#p-select").html(strHtml);
      layui.form.render(); //layui的form无法监听到 动态创建的option
    });
  }

  // 给筛选键注册submit事件
  // 2. 获取select的选中值
  // 3. 拼装q参数
  // 4. 重新获取列表数据

  $(".layui-form").submit(function (e) {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    q.cate_id = cate_id;
    var state = $("[name=state]").val();
    q.state = state;
    initTable();
  });

  // 分页
  // 渲染分页视图   : initTable末尾调用renderPage
  function renderPage(total) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;
      //执行一个laypage实例
      laypage.render({
        elem: "wocao", //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum, //起始页
        limit: q.pagesize,
        limits: [2, 3, 5],
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        jump: function (obj, first) {
          //obj包含了当前分页的所有参数，比如：
          // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          // console.log(obj.limit); //得到每页显示的条数
          q.pagenum = obj.curr;
          q.pagesize = obj.limit;

          //首次不执行
          if (!first) {
            initTable();
          }
        },
      });
    });
  }

  // 删除
  $("tbody").on("click", ".delete", function (e) {
    var len = $(".delete").length;
    var Id = $(this).attr("data-id");
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      $.get("/my/article/delete/" + Id, function (res) {
        if (res.status === 0) {
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
          layer.close(index);
        }
      });
    });
  });
});
