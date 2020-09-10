$(function () {
  //   var token = localStorage.getItem("token") || "";
  $.ajax({
    url: "/my/userinfo",
    // headers: {
    //   Authorization: token,
    // },
    success: function (res) {
      console.log(res);
      renderAvatar(res.data);
    },
  });

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

  $("#btn-logout").click(function () {
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      //do something
      localStorage.removeItem("token");
      window.location.href = "login.html";

      layer.close(index);
    });
  });
});
