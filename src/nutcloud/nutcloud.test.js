const NutCloud = require('./')
const fs = require('fs')
const process = require('process')

test('NutCloud', async () => {
  let nc = new NutCloud({
    server: 'https://dav.jianguoyun.com/dav/',
    username: 'invalid usernmae',
    password: 'invalid password',
  })
  expect(nc).not.toBe(null)
  expect(await nc.ping()).toBe(false)

  const username = process.env.NUTCLOUD_USERNAME
  const password = process.env.NUTCLOUD_PASSWORD
  const server = process.env.NUTCLOUD_SERVER
  nc = new NutCloud({ server, username, password })
  expect(nc).not.toBe(null)
  expect(await nc.ping()).toBe(true)

  let err = null
  try {
    // TODO list is not working
    await nc.list('/hello')
  } catch (e) {
    err = e
  }
  // expect(err).toBe(null)

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
  expect(res.status).toBe(204)

  const content = await nc.getItem(fileDest, { type: 'text' })
  expect(content).toEqual(fileContent)

  const img = await nc.getItem(imgDest)
  expect(img).toEqual(imgContent)
}, 15000)
