const { fetch } = require('whatwg-fetch')
const { isNode } = require('browser-or-node')
const mime = require('mime')
const sdk = require('dropbox')

class Dropbox {
  constructor(token) {
    this.dbx = new sdk.Dropbox({
      accessToken: token,
      fetch,
    })
  }

  async upload(options = {}) {
    const {
      dest,
      content,
    } = options
    if (!dest || !content) {
      throw new Error('dest and content are required')
    }

    const type = options.type || mime.getType(dest)
    const body = isNode ? content : new Blob([content], { type })


    // TODO check content size
    return this.dbx.filesUpload({
      path: dest,
      contents: body,
    })
  }

  async getItem(path, onlyContent = false) {
    const res = this.dbx.filesGetTemporaryLink({ path })
    if (onlyContent) {
      return fetch(res.link, {
        method: 'GET',
        headers: {
          'Content-Type': mime.getType(path),
        },
      })
    }
    return res
  }

  async list(dir) {
    return this.dbx.filesListFolder({ path: dir })
  }
}

module.exports = Dropbox
