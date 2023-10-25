# BJET Weekly Report Form Automation Script

So I was thinking why bother with the weekly report form when I can automate it. So I did. Also this line I just wrote
was auto completed by GitHub copilot. This is awesome.

## How to use

Since I used PuppeteerJS and JS (Duh) to create this, you need to have npm installed to install the necessary
dependencies. To do that, run the following command in the project directory.

```bash
npm install
```

Next up, edit the .env file to change the name and id to your name and id.

### I used EDGE to test and automate the form. I am not quite sure if simply changing the browser exe path to chrome exe location will work, but you can try if you hate Edge that much.

For changing the information of the form according to your needs, edit the `answers.js` file. This is not the most
eloquent method, but I found editing another .js file to be the easiest method, and inputting so much info in the
console can be a problem specially if the script fails for some reason.

## Issues

Sometimes the script simply doesn't start after the browser instance is launched, not sure why, but in that case
just `ctrl+c` the script and restart it. Should "fix" the issue.