window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

// ...

function playTunes() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8000/download", true);
  request.responseType = "arraybuffer";

  spinner.show();

  request.onload = function () {
    spinner.hide();
    var Data = request.response;
    process(Data);
  };

  request.send();
}

function process(Data) {
  source = context.createBufferSource(); // Create Sound Source
  context.decodeAudioData(Data, function (buffer) {
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
  });
}

var spinner = document.getElementById('spinner');

spinner.hide = function () {
  this.style.display = 'none';
};

spinner.show = function () {
  this.style.display = 'block';
}

function stopTunes() {
  if (source.stop) {
    source.stop();
  }
}