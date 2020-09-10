$(function () {
  $("#link-login").click(function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-reg").click(function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  var form = window.layui.form;
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 自定义模式
    repassword: function (value) {
      if ($("#firstpass").val() !== value) {
        return "两次密码不一样";
      }
    },
  });

  // 注册
  $("#layui-form").on("submit", function (e) {
    e.preventDefault();
    $.post("/api/reguser", $(this).serialize(), function (res) {
      // console.log(res);

      if (res.status === 0) {
        $("#link-reg").click();
      }
      // console.log(window);window里面有layer
      layer.msg(res.message);
    });
  });

  //登录
  $("#layui-form-login").on("submit", function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: formData,
      success: function (res) {
        // console.log(res);
        if (res.status === 0) {
          window.location.href = "index.html";
          localStorage.setItem("token", res.token);
        }
      },
    });
  });
});
