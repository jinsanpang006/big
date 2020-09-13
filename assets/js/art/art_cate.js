// 入口
$(function () {
  // 发送请求拿模板引擎的数据
  initArticleList();
  function initArticleList() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        // console.log(res);
        var strhtml = template("jsp", res);
        $("tbody").html(strhtml);
      }
    });
  }

  // 点击添加类别出弹出层
  var addIndex = 0;
  var addmode = $("#add").html();
  $("#addBtn").click(function () {
    addIndex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      //   content能识别标签 要字符串
      content: addmode,
    });
  });

  // 确认添加  的注册事件
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status === 0) {
          initArticleList();
          layer.close(addIndex);
        }
      },
    });
  });

  // 点击编辑类别出弹出层
  var indexEdit = 0;
  var addedit = $("#edit").html();
  // 因为是添加的 所以要注册事件
  $("tbody").on("click", ".btn-edit", function (e) {
    // console.log(1);
    e.preventDefault();
    indexEdit = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "编辑文章分类",
      content: addedit,
    });

    //  在打开的编辑分类弹出层表单中显示要编辑的分类信息
    var id = $(this).attr("data-id");
    $.get(`/my/article/cates/${id}`, function (res) {
      //   console.log(res);
      layui.form.val("editForm", res.data);
    });
  });

  //   点击确定修改按钮，更新文章分类
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    $.post("/my/article/updatecate", $("#editForm").serialize(), function (e) {
      //   console.log(e);
      layer.close(indexEdit);
      initArticleList();
    });
  });

  // 点击编辑类别弹出confirm框并且根据id删除

  $("tbody").on("click", ".btn-delete", function (e) {
    e.preventDefault();
    var Id = $(this).attr("data-id");
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
      $.get(`/my/article/deletecate/${Id}`, function (res) {
        console.log(res);
        if (res.status === 0) {
          initArticleList();
          layer.close(index);
        } else {
          layer.msg(res.message);
        }
      });
    });
  });
});
