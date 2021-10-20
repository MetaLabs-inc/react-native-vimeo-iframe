export default (
  videoId: string,
  loop: boolean,
  autoPlay: boolean,
  controls: boolean,
  speed: boolean
) => `
<html><head>
<title></title>
<script src="https://f.vimeocdn.com/js/froogaloop2.min.js"></script>
<script src="https://player.vimeo.com/api/player.js"></script>
</head>
<body style="height: 100%; width: 100%;" data-new-gr-c-s-check-loaded="14.996.0" data-gr-ext-installed="" cz-shortcut-listen="true">


<script>
var PLAYER_ID = 'player';

function webViewBridge() {
const vid = '${videoId}';
const isLooping = ${loop} ? '1' : '0';
const isAutoPlaying = ${autoPlay} ? '1' : '0';
const showControls = ${controls} ? '1' : '0';
const showSpeed = ${speed} ? '1' : '0';

if (!vid) {
  return;
}

let iframe;
iframe = document.createElement('iframe');
iframe.src =
 'https://player.vimeo.com/video/' + vid + '?api=1&muted=1' + '&autoplay=' + isAutoPlaying + '&loop=' + isLooping + '&controls=' + showControls  + '&speed=' + showSpeed +'&player_id=' + PLAYER_ID;
iframe.width = '100%';
iframe.height = '98%';
iframe.frameBorder = '0';
iframe.webkitallowfullscreen = true;
iframe.allowfullscreen = true;
iframe.mozallowfullscreen = true;
iframe.allow="autoplay;fullscreen"
iframe.id = PLAYER_ID;
document.body.appendChild(iframe);
var player = $f(iframe);
player.addEvent('ready', function() {
  // Ideally we could just iterate over event names and add the sendEvent
  // handler to each of them, however that doesn't work because sendEvent
  // ends up just being called with whatever was the last event in the array.
  player.addEvent('play', function(data) {
    sendEvent('play', data);
  });
  player.addEvent('playProgress', function(data) {
    sendEvent('playProgress', data);
  });
  player.addEvent('pause', function(data) {
    sendEvent('pause', data);
  });
  player.addEvent('finish', function(data) {
    sendEvent('finish', data);
  });
  sendEvent('ready');
});

player.api(message, function(data) {
  sendEvent(message, data);
});
const  sendEvent = (evt, data) => {
  // Passes events through the bridge
  var payload = {
    name: evt,
    data: data
  };
  window.ReactNativeWebView.postMessage(JSON.stringify(payload));
}
}

webViewBridge();
</script>
</body></html>
`
