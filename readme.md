# static-httpd
This is a simple http server for static content. It will be installed as a service in your system.
> Warning: This was only tested in Windows 10.

> Warning: This IS NOT production ready.

## Usage

##### Step 1
In your project directory, create a YAML file with the name you want. I will call mine: `settings.yml` (this one will be used in step 4).

##### Step 2
In `settings.yml`, write the following content:
```yaml
sourceDir: ../src/
port: 8001
```
> 1. `sourceDir` must point to where your files will be.
> 2. This path must be relative to `settings.yml` path.
> 3. `port` defines where the HTTP server will be listening for requests.

##### Step 3
In source directory, create a file named `test.txt` with the following content:
```
Test OK!
```

##### Step 4
Install the server as a service with the following comands:
```bash
npm install -g static-httpd
static-service install my-project "/absolute/path/to/my/settings.yml"
```

##### Step 5
Since we are on Windows, go to Services and search for our newly created service whose name is `static-my-project`. Start the service if it is not alreay running.

##### Step 6
In your browser, get `http://127.0.0.1:8001/test.txt` and done!

## Have Questions?
Please, if you have any questions, suggestions, doubts, etc.. Don't hesitate to open issues.

Thanks!
