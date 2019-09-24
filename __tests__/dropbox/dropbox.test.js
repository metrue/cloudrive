const { Dropbox } = require('../../src')
const process = require('process')
const fs = require('fs')

let api
beforeAll(() => {
  const tok = process.env.DROPBOX_TOKEN
  api = new Dropbox(tok)
})

describe('dropbox workflow', () => {
  const dir = '/test'
  test('upload', async () => {
    let dest = `${dir}/hello.txt`
    let content = 'hello world'
    let res = await api.upload({ dest, content })
    expect(res.name).toBe('hello.txt')
    expect(res.id).not.toBe('')
    expect(res.path_lower).toBe(`${dest}`)

    dest = `${dir}/hello.jpeg`
    content = fs.readFileSync('__tests__/dropbox/pic.jpeg')
    res = await api.upload({ dest, content})
    expect(res.name).toBe('hello.jpeg')
    expect(res.id).not.toBe('')
    expect(res.path_lower).toBe(`${dest}`)
  }, 15000)

  test('get item', async () => {
    let res = await api.getItem('/test/hello.txt')
    expect(res.link).not.toBe('')
    const onlyContent = true
    res = await api.getItem('/test/hello.txt', onlyContent)
    expect(res.ok).toBeTruthy()
    const text = await res.text()
    expect(text).toBe('hello world')
  }, 15000)
  test('list', async () => {
    // const res = await api.list(dir)
    // expect(res.ok).toBeTruthy()
  }, 15000)
  test('download', async () => {
    // FIXME it's weird, it will report a Cross oirig null error
    // let res = await api.download('test/hello.txt')
    // expect(res.ok).toBeTruthy()
    // res = await api.download('test/hello.jpeg')
    // expect(res.ok).toBeTruthy()
  }, 15000)
})
