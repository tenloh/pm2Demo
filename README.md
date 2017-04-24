Introduction
Brief Case Study
Ran into an issue where I couldn’t log into my box. This was because of a github api issue in which there was only at most 100 people per page, and as a result, I needed to append myself to the authorized keys in order to do so.
Wrote a cron job to append myself every 5 minutes if it wasn’t there. It’s a bit hacky but it got the job done. 
However, I needed a way to keep it alive after I closed my computer and went home
In comes PM2
Node based Process Management Tool
Starts processes and keep track of them, allowing you to exit terminal and continue running the process
Exceptionally helpful for keeping long-running processes alive on a box
How to use PM2
Pm2 start - Start a process
Pm2 stop 
Pm2 kill
Pm2 list 
Pm2 monitor
Process.yml -> demonstrate multi threading and control of many at once
Pm2 log
Combine this with PMX, which is written specifically for PM2
PMX allows you to expose code metrics from your code to the PM2 monit command or the Keymetrics Dashboard, in realtime and over time.
Can measure metrics immediately
Can measure counters
Measure things that are done at intervals
Keep a reservoir of things relevant for a certain amount of time
Surprisingly, a lot of big companies are using it
Paypal, Microsoft, Southwest
How it works
Do I need to talk about this?
Almost all JavaScript and 10% shell
What can we use it for?
May be another way we can set up some sort of testing since we can monitor what values are being changed and we can also monitor longer running processes like values and data.


