# Athan Player
This code lets you use a Raspberry Pi to play athan audio at prayer times. 

## Set up
On your Raspberry Pi:
1. Run `timedatectl`, ensure your timezone is correct.
2. Install tools: `sudo apt install nodejs mpg123`
3. Download this repo: `git clone https://github.com/simplesalah/athan-player.git`
4. **Update the config section of [app.js](app.js) with your settings. Ensure each line is correct, especially file paths.**
5. Use crontab to launch the script at startup:
    1. Run `crontab -e` 
    2. Add this line to the crontab file: `@reboot sleep 5m && node /home/pi/athan-player/app.js`.
        * **Update the app.js path to your actual path.** 
6. Connect your speaker to your Pi.
7. Restart the Pi, and you should be good to go!
    - Restart again whenever you update the config.

## PrayTimes library
We utilize the useful [PrayTimes](http://praytimes.org/) library, but note we added an export line to the end. So you need to use the version in this repo.
