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
- Move [athan-player.desktop](athan-player.desktop) to `~/.config/autostart`. 
    - Ensure that the path to [app.js](app.js) in the [athan-player.desktop](athan-player.desktop) file is correct. 
- Update the config section of [app.js](app.js) with your settings.
    - Restart your Pi whenever you update the config.
- Connect your speaker to your Pi.
- Restart the Pi, and you should be good to go! 

## PrayTimes library
We utilize the useful [PrayTimes](http://praytimes.org/) library, but note we added an export line to the end. So you need to use the version in this repo. 