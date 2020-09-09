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
  $("#layui-form").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://ajax.frontend.itheima.net/api/reguser",
      $(this).serialize(),
      function (res) {
        if (res.status === 0) {
          alert(res.message);
        } else {
          alert(res.message);
        }
        // alert(1);
      }
    );
  });
});
