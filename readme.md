# static-httpd
This is a simple http server for static content. It will be installed as a service in your system.
> Warning: This was only tested in Windows 10.

> Warning: This IS NOT production ready.

> Obs.: For commands, be sure to use a elevated console (admin rights).

## Prerequisites
- You MUST be running **Windows 10** or **Linux** (untested).
- You MUST have up to date **Node JS** installed.
- You MUST have up to date **NPM** installed.
- If running Windows 10, you must run the following command: `npm install --global --production windows-build-tools`. Obs.: It may fail sometimes.
- If running Windows 10, you must ensure Phyton 2.7 (installed in the previous item) is in your Path.

## Usage

##### Step 1
In your project directory, create a YAML file with the name you want. I will call mine: `settings.yml` (this one will be used in step 4).

##### Step 2
In `settings.yml`, write the following content:
```yaml
sourceDir: .
port: 8001
```
> 1. `sourceDir` must point to where your served files will be.
> 2. This path must be relative to `settings.yml` path.
> 3. `port` defines where the HTTP server will be listening for requests.

##### Step 3
In the same directory, create a file named `test.txt` with the following content:
```
Test OK!
```

##### Step 4
Install the server as a service with the following comands:

```
npm install -g os-service
npm install -g static-httpd
static-service install my-project "/absolute/path/to/my/settings.yml"
```

##### Step 5
- On Windows, start the server running: `net start static-my-project` on elevated shell.
- On Debian/Ubuntu, start the server running: `sudo service my-project start`.

##### Step 6
In your browser, get `http://127.0.0.1:8001/test.txt` and done!

## Have Questions?
Please, if you have any questions, suggestions, doubts, etc.. Don't hesitate to open issues.

Thanks!
