function launch() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8000/", true);
  request.responseType = "arraybuffer";

  spinner.show();

  request.onload = function () {
    spinner.hide();
  };

  request.send();
}



var spinner = document.getElementById('spinner');

spinner.hide = function () {
  this.style.display = 'none';
};

spinner.show = function () {
  this.style.display = 'block';
}