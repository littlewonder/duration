chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            //initial speed
            var speed = 1.00;

            //get video
            var vid = document.querySelector('video');

            //call events on key press
            window.addEventListener("keydown", handleEvent, false);

            //get total time to finish
            currTime = vid.duration;

            //Change Current Time to Hours and Minutes from Seconds
            minutesRemaining = convertTime(currTime);

            //Add Current Speed and Time remaining Node
            var controlPanel = document.createElement("div");
            var currSpeed = document.createElement("span");
            var timeToComplete = document.createElement("span");
            currSpeed.innerHTML = "Current Speed: " + speed;
            timeToComplete.innerHTML = "Time to Complete: "+ minutesRemaining;
            controlPanel.appendChild(currSpeed);
            controlPanel.appendChild(timeToComplete);
            controlPanel.className='panel';
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
                //Limit length of seconds
                sec = parseInt(sec);

                return hours + ':' + min + ':' + sec;
            }

            function handleEvent(e) {
                var keyCode = e.keyCode;
                //if key is "-" decrease speed
                if (keyCode == 189 || keyCode == 109) {
                    //decrease speed
                    speed -= 0.25;

                    //update Speed
                    currSpeed.innerHTML = "Current Speed: " + speed;

                    //decrease playback rate
                    vid.playbackRate -= 0.25;

                    //change time to finish
                    currTime = (currTime * 5) / 4;
                    minutesRemaining = convertTime(currTime);

                    //update time to finish
                    timeToComplete.innerHTML = "Time to Complete: "+ minutesRemaining;
                }
                //if key is "=" increase speed
                else if (keyCode == 187 || keyCode == 107) {
                    //increase speed
                    speed += 0.25;

                    //update Speed
                    currSpeed.innerHTML = "Current Speed: " + speed;

                    //increase playback rate
                    vid.playbackRate += 0.25;

                    //change time to finish
                    currTime = (currTime * 4) / 5;
                    minutesRemaining = convertTime(currTime);

                    //update time to finish
                    timeToComplete.innerHTML = "Time to Complete: "+ minutesRemaining;
                } else {
                    //do nothing
                }
            };
        }
    }, 10);
});
