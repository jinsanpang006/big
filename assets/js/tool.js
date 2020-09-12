$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  // base url
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  var token = localStorage.getItem("token") || "";
  // console.log(options);
  // 统一设置请求头
  // includes 字符串判断里面有无 具体小内容的方法 布尔类型
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: token,
    };
  }

  // 统一判断有无token
  options.complete = function (res) {
    // console.log(res);
    if (res.responseJSON.status == 1) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  };
});
