let showAlert = true;
let $banner = null;

let curVideo = null;
let minDiff = 9999;
let diff = 0;
let avgAboveDiff = 0;

function checkCurVideo(){
  let video = $("video")

  if(video.length == 1){
    curVideo = video[0]
  }
  else {
    curVideo = null
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    let msg = request.message;

    if(msg == 'showAlert'){
      showAlert = true;
    }

    if(msg == 'noAlert'){
      showAlert = false;
      $banner.hide();
    }

    // listen for messages sent from background.js
    if (msg === 'lowlatency!') {
      checkCurVideo();

      if(curVideo){
        curVideo.currentTime = curVideo.buffered.end(0)

        function checkMinDiff(){
          setTimeout(()=>{
            if(diff <= 0) checkMinDiff();
            minDiff = diff;
            avgAboveDiff = 0;
          }, 2000)
        }

        checkMinDiff();
      }
    }
  }
);

$( document ).ready(function() {
  console.log("Low Latency Extension ready!");

  let banner = `
    <div class="lleBanner" style="display: none; z-index: 99999; position: absolute; top: 10px; left: 10px; border-radius: 5px; padding: 5px; color:red; font-family: Monaco; font-weight: bold; background-color:rgba(0,0,0,0.75);">Delay: <span class="extLatVal"></span>s</div>
  `;

  $banner = $(banner);
  $('body').append($banner);
});

setInterval(()=>{
  checkCurVideo();

  if(curVideo){
    diff = curVideo.buffered.end(0) - curVideo.currentTime

    if(diff > 0){
      if(diff < minDiff)
        minDiff = diff;

      console.log("current diff", diff, minDiff, avgAboveDiff)

      let showBanner = false

      if(diff > 3 && (diff > minDiff * 2 || diff > 15)){        
        if(diff+1 > avgAboveDiff){
          if(showAlert){
            let $video = $(curVideo)
            let videoPos = $video.offset()
            $banner.css('left', videoPos.left+'px')
            $banner.css('top', videoPos.top+'px')
            $banner.show();

            let diffRound = Math.round(diff*10)/10
            $banner.find(".extLatVal").html(diffRound)

            showBanner = true
          }
        }

        avgAboveDiff = (avgAboveDiff + diff)/2
      }  
      
      if(!showBanner)
        $banner.hide();
      
    }
  }
}, 1000);