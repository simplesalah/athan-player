# Athan Player
This code lets you use a Raspberry Pi to play athan audio at prayer times. 

## Set up
- Ensure your Raspberry Pi's timezone is correct (e.g. "Mexico City" for Central time).
- Install Node.js on the Pi: 
    1. `sudo su - root`
    2. `curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -`
        - I had to first run `apt-get update --allow-releaseinfo-change` to resolve an error.
    3. `apt-get install -y nodejs`
    4. `exit #don't stay root`
- Download this repo to the Pi: `git clone https://github.com/simplesalah/athan-player.git`
- Use crontab to launch the script at startup:
    1. Run `crontab -e` 
    2. Add this line to the crontab file: `@reboot nodejs /home/pi/athan-player/app.js` (use your actual app path). 
- Connect your speaker to your Pi.
- **Update the config section of [app.js](app.js) with your settings. Ensure each line is correct!**
- Restart the Pi, and you should be good to go! 
    - Restart again whenever you update the config.

## PrayTimes library
We utilize the useful [PrayTimes](http://praytimes.org/) library, but note we added an export line to the end. So you need to use the version in this repo.
