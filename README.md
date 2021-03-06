# cloudrive

wrapers for cloud storage API (onedrive, ...) for Node and browser.

## Usage

* install

```
npm install cloudrive
```

* import to your code

```
const { OneDrive } = require('cloudrive')
```

* upload plain text

```javascript
    // Your onedrive oauth access token
    const tok = process.env.ONE_DRIVE_TOKEN
    const api = new OneDrive(tok)
    const dest = `test/hello.txt`
    const content = 'hello world'
    const res = await api.upload({ dest, content })
    if (res.ok) {
      console.log('ok')
    } elese {
      console.log(`error: ${res.status} ${res.statusText}`)
    }
```

* upload image

```javascript
    // Your onedrive oauth access token
    const tok = process.env.ONE_DRIVE_TOKEN
    const api = new OneDrive(tok)
    const dest = `test/hello.jpeg`
    const content = fs.readFileSync('<path to your image>')
    const res = await api.upload({ dest, content })
    if (res.ok) {
      console.log('ok')
    } elese {
      console.log(`error: ${res.status} ${res.statusText}`)
    }
```

* download a file

```javascript
    // Your onedrive oauth access token
    const tok = process.env.ONE_DRIVE_TOKEN
    const api = new OneDrive(tok)
    const res = await api.download('test/hello.txt')
    if (res.ok) {
      console.log('ok')
    } elese {
      console.log(`error: ${res.status} ${res.statusText}`)
    }
```

