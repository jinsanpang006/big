$.ajaxPrefilter(function (options) {
  console.log(options.url);
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  var token = localStorage.getItem("token") || "";
  // console.log(options);
  options.headers = {
    Authorization: token,
  };
});
