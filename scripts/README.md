## Scraper
To run the scraper locally:
```
python3 scripts/scrape_routes.py one -local
```

### On EC2
To run scraper from ec2 machine you must first ssh into one of the machines 
```
ssh ubuntu@<get-ip-address-from-aws-console> -i <path/to/the/ssh.pem>
```

then run this command
```
nohup python3 scripts/scraper_routes.py one > scraper.log &
```

replace `one` with either `two` or `three` if on the according machine. After running this command hit `enter` again. The process will now be running in the background and not connected to your ssh session. You can exit the shell and the process will keep running. All of the print statements in the script that would normally go to `stdout` are going to a file called `scraper.log`. All errors are going into `error.log`.