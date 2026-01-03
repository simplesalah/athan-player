# Athan Player
This code lets you use a Raspberry Pi to play athan audio at prayer times. 

## Set up
- Ensure your Raspberry Pi's timezone is correct. Run `timedatectl` to check.
- Install Node.js on the Pi: `sudo apt-get install -y nodejs`
- Download this repo to the Pi: `git clone https://github.com/simplesalah/athan-player.git`
- Use crontab to launch the script at startup:
    1. Run `crontab -e` 
    2. Add this line to the crontab file: `@reboot sleep 5m && nodejs /home/pi/athan-player/app.js`.
        * **Update the app.js path to your actual path.** 
- Connect your speaker to your Pi.
- **Update the config section of [app.js](app.js) with your settings. Ensure each line is correct, especially file paths.**
- Restart the Pi, and you should be good to go! 
    - Restart again whenever you update the config.

Note that omxplayer appears to have a bug that stops playing the athan file before it actually ends. To remedy this you can add silence to the end of the file using Audacity. 

## PrayTimes library
We utilize the useful [PrayTimes](http://praytimes.org/) library, but note we added an export line to the end. So you need to use the version in this repo.
