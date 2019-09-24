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
  test('list', async () => {})
  test('download', async () => {})
})
