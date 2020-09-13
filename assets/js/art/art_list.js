// 入口
$(function () {
  var q = {
    pagenum: 1,
    pagesize: 5,
    cate_id: "",
    state: "",
  };
  initTable();
  function initTable() {
    $.get("/my/article/list", q, function (res) {
      console.log(res);
      if (res.status === 0) {
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      } else {
        layer.msg(res.message);
      }
    });
  }
});
