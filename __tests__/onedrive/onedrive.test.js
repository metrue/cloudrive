const { OneDrive } = require('../../src')
const process = require('process')
const fs = require('fs')

let api
beforeAll(() => {
  const tok = process.env.ONE_DRIVE_TOKEN
  api = new OneDrive(tok)
})

describe('onedrive workflow', () => {
  const dir = 'test'
  test('upload', async () => {
    let dest = `${dir}/hello.txt`
    let content = 'hello world'
    let res = await api.upload({ dest, content })
    expect(res.ok).toBeTruthy()

    dest = `${dir}/hello.jpeg`
    content = fs.readFileSync('__tests__/onedrive/pic.jpeg')
    res = await api.upload({ dest, content})
    expect(res.ok).toBeTruthy()
  }, 15000)

  test('get item', async () => {
    let res = await api.getItem('test')
    expect(res.ok).toBeTruthy()
  })
  test('list', async () => {
    const res = await api.list(dir)
    expect(res.ok).toBeTruthy()
  }, 15000)
  test('download', async () => {
    // FIXME it's weird, it will report a Cross oirig null error
    // let res = await api.download('test/hello.txt')
    // expect(res.ok).toBeTruthy()
    // res = await api.download('test/hello.jpeg')
    // expect(res.ok).toBeTruthy()
  }, 15000)
})
