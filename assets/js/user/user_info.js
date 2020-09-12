// 入口函数
$(function () {
  //   console.log(window);
  // layui表单验证
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "请输入1-6位字母";
      }
    },
  });

  // 获取用户的基本信息
  getUserInfo();
  function getUserInfo() {
    $.get("/my/userinfo", function (res) {
      console.log(res);
      // 表单赋值
      if (res.status == 0) {
        layui.form.val("formInfo", res.data);
      }
    });
  }

  //   重置;
  $("#reset").click(function (e) {
    e.preventDefault();
    getUserInfo();
  });

  //   更新用户信息
  $("#formup").submit(function (e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function (res) {
      if (res.status == 0) {
        console.log(res);
        // console.log(window.parent.getUserInfo);
        window.parent.getUserInfo();
      }
    });
  });
});
