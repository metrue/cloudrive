const NutCloud = require('./')
const fs = require('fs')

test('NutCloud', async () => {
  const username = 'h.minghe@gmail.com'
  const password = 'adzuuhve7m2vihjb'
  const server = 'https://dav.jianguoyun.com/dav/iiiiili'
  const nc = new NutCloud({ server, username, password })
  expect(nc).not.toBe(null)

  let err = null
  try {
    // TODO list is not working
    await nc.list('/hello')
  } catch (e) {
    err = e
  }
  expect(err).toBe(null)

  const dir = '/hello'
  try {
    await nc.createDir(dir)
  } catch (e) {
    err = e
  }
  expect(err).toBe(null)

  const fileDest = `${dir}/hello.txt`
  const fileContent = 'hello world'
  try {
    await nc.upload({ dest: fileDest, content: fileContent })
  } catch (e) {
    err = e
  }
  expect(err).toBe(null)

  const imgDest = `${dir}/hello.jpeg`
  const imgContent = fs.readFileSync('./src/nutcloud/fixtures/pic.jpeg')
  const res = await nc.upload({ dest: imgDest, content: imgContent })
  expect(res.status).toBe(201)
  expect(res.statusText).toBe('Created')

  const content = await nc.getItem(fileDest, { type: 'text' })
  expect(content).toEqual(fileContent)

  const img = await nc.getItem(imgDest)
  expect(img).toEqual(imgContent)
}, 15000)
