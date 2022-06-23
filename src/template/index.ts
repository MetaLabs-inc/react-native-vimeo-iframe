export default (url: string) => `
const getOrientation = () => {
  const orientation = document.fullscreenElement  ? 'landscape' : 'portrait';
  return orientation;
};

const sendEvent = (name, data) => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ name, data }));
};

const addListeners = () => {
  const video = document.querySelector('video');
  const controls = document.querySelector('.vp-controls');
  let isVisibleControls = ${!url.includes('controls=0')};
  window.addEventListener("fullscreenchange", (e) => {
    const orientation = getOrientation();
    sendEvent('fullscreenchange', { e, orientation });
  }, false);
  
  if(video) {
    video.addEventListener("timeupdate", (e) => {
      const percent = Math.round((e.target.currentTime / e.target.duration)*100).toFixed();
      sendEvent('timeupdate', { currentTime: e.target.currentTime, duration: e.target.duration, percent });
    });
    video.addEventListener('audioprocess', (e) => sendEvent('audioprocess', e));
    video.addEventListener('canplay', (e) => sendEvent('canplay', e));
    video.addEventListener('canplaythrough', (e) => sendEvent('canplaythrough', e));
    video.addEventListener('complete', (e) => sendEvent('complete', e));
    video.addEventListener('durationchange', (e) => sendEvent('durationchange', e));
    video.addEventListener('emptied', (e) => sendEvent('emptied', e));
    video.addEventListener('ended', (e) => sendEvent('ended', e));
    video.addEventListener('loadeddata', (e) => sendEvent('loadeddata', e));
    video.addEventListener('loadedmetadata', (e) => sendEvent('loadedmetadata', e));
    video.addEventListener('pause', (e) => sendEvent('pause', e));
    video.addEventListener('play', (e) => sendEvent('play', e));
    video.addEventListener('playing', (e) => sendEvent('playing', e));
    video.addEventListener('ratechange', (e) => sendEvent('ratechange', e));
    video.addEventListener('seeked', (e) => sendEvent('seeked', e));
    video.addEventListener('seeking', (e) => sendEvent('seeking', e));
    video.addEventListener('stalled', (e) => sendEvent('stalled', e));
    video.addEventListener('suspend', (e) => sendEvent('suspend', e));
//     video.addEventListener('timeupdate', (e) => sendEvent('timeupdate', e));
    video.addEventListener('volumechange', (e) => sendEvent('volumechange', e));
    video.addEventListener('waiting', (e) => sendEvent('waiting', e));
  }
  
  setInterval(()=>{
    if(controls) {
      const visible = !controls.classList.contains("invisible");
      if(visible !== isVisibleControls){
        isVisibleControls = visible;
        sendEvent('controlschange', { visible });
      }
    }
  },300);
};

setTimeout(function(){addListeners()}, 1000);
`
