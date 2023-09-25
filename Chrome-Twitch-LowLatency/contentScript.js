chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // listen for messages sent from background.js
    if (request.message === 'lowlatency!') {
      let video = $("video")

      if(video.length == 1)
        video = video[0]
        video.currentTime = video.buffered.end(0)
    }
  }
);