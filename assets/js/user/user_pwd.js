// 入口
$(function () {
  // 验证
  layui.form.verify({
    len: [/^\S{6,12}$/, "长度必须6到12位，不能有空格"],
    diff: function (value) {
      var oldPwd = $('[name="oldPwd"]').val();
      if (oldPwd == value) {
        return "和原密码不能相同";
      }
    },
    same: function (value) {
      var newPwd = $('[name="newPwd"]').val();
      if (newPwd !== value) {
        return "两次输入必须一致";
      }
    },
  });

  // 更新密码
  $("#formInfo").submit(function (e) {
    e.preventDefault();
    $.post("/my/updatepwd", $(this).serialize(), function (res) {
      console.log(res);
      layer.msg(res.message);
      if (res.status == 0) {
        $("#btn-reset").click();
      }
    });
  });
});
