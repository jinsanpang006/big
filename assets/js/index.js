// 获取用户信息
$(function () {
  //   var token = localStorage.getItem("token") || "";
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      // headers: {
      //   Authorization: token,
      // },
      success: function (res) {
        // console.log(res);
        if (res.status == 1) {
          return;
        }
        renderAvatar(res.data);
      },

      // 请求完成后 判断token有无
      // complete: function (res) {
      //   console.log(res);
      //   if (res.responseJSON.status == 1) {
      //     localStorage.removeItem("token");
      //     window.location.href = "login.html";
      //   }
      // },
    });
  }
  window.getUserInfo = getUserInfo;

  // 根据返回的res 的data 里面的属性 设置头像以及名字
  function renderAvatar(data) {
    var name = data.nickname || data.username;
    $("#welcome").html("欢迎" + name);

    if (data.user_pic !== null) {
      $(".layui-nav-img").attr("src", data.user_pic).show();
      $(".text-avatar").hide();
    } else {
      $(".layui-nav-img").hide();
      var first = name[0].toUpperCase();
      $(".text-avatar").html(first).show();
    }
  }

  // 退出
  $("#btn-logout").click(function () {
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      //do something
      localStorage.removeItem("token");
      window.location.href = "login.html";

      layer.close(index);
    });
  });
});
