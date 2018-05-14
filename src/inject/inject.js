chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            //initial speed
            var speed = 1.00;

            //call events on key press
            window.addEventListener("keydown", handleEvent, false);

            //get total time to finish
            currTime = document.getElementsByClassName('video-stream')[0].duration;

            //Change Current Time to Hours and Minutes from Seconds
            minutesRemaining = convertTime(currTime);
            document.getElementsByClassName('ytp-time-duration')[0].innerHTML = minutesRemaining;

            //Add Current Speed Node
            var controlPanel = document.createElement("div");
            var currSpeed = document.createElement("span");
            currSpeed.innerHTML = "Current Speed: <strong>" + speed + "</strong>";
            controlPanel.appendChild(currSpeed);
            controlPanel.className = 'panel';
            document.getElementsByClassName('html5-video-player')[0].appendChild(controlPanel);

            //converts seconds to hours&minutes https://stackoverflow.com/a/49905383
            function convertTime(sec) {
                var hours = Math.floor(sec / 3600);
                (hours >= 1) ? sec = sec - (hours * 3600): hours = '00';
                var min = Math.floor(sec / 60);
                (min >= 1) ? sec = sec - (min * 60): min = '00';
                (sec < 1) ? sec = '00': void 0;

                (min.toString().length == 1) ? min = '0' + min: void 0;
                (sec.toString().length == 1) ? sec = '0' + sec: void 0;

                if (hours === 00 ) {
                    res = min + ':' + ~~sec;
                } else {
                    res = hours + ':' + min + ':' + ~~sec;
                }
                return res;

            }

            function handleEvent(e) {
                var keyCode = e.keyCode;
                //if key is "-" decrease speed
                if (keyCode == 189 || keyCode == 109) {
                    //decrease speed
                    speed -= 0.25;

                    //update Speed
                    currSpeed.innerHTML = "Current Speed: <strong>" + speed + "</strong>";

                    //decrease playback rate
                    document.getElementsByClassName('video-stream')[0].playbackRate -= 0.25;

                    //change time to finish
                    currTime = (currTime * 5) / 4;
                    minutesRemaining = convertTime(currTime);

                    //update time to finish
                    document.getElementsByClassName('ytp-time-duration')[0].innerHTML = minutesRemaining;
                }
                //if key is "=" increase speed
                else if (keyCode == 187 || keyCode == 107) {
                    //increase speed
                    speed += 0.25;

                    //update Speed
                    currSpeed.innerHTML = "Current Speed: <strong>" + speed + "</strong>";

                    //increase playback rate
                    document.getElementsByClassName('video-stream')[0].playbackRate += 0.25;

                    //change time to finish
                    currTime = (currTime * 4) / 5;
                    minutesRemaining = convertTime(currTime);

                    //update time to finish
                    document.getElementsByClassName('ytp-time-duration')[0].innerHTML = minutesRemaining;
                } else {
                    //do nothing
                }
            };
        }
    }, 10);
});
