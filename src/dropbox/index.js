require('es6-promise')
const fetch = require('isomorphic-fetch')
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
      mode: 'overwrite',
    })
  }

  async getItem(path, options = {}) {
    const res = await this.dbx.filesGetTemporaryLink({ path })
    if (options && options.onlyContent) {
      const r = await fetch(res.link, {
        method: 'GET',
        headers: {
          'Content-Type': options.type || mime.getType(path),
        },
      })
      if (r.ok) {
        if (options.type === 'text') {
          return r.text()
        }
        if (options.type === 'json') {
          return r.json()
        }
        return r.blob()
      }
      return new Error(`download file failed: ${r.status}`)
    }
    return res
  }

  async list(dir) {
    return this.dbx.filesListFolder({ path: dir })
  }
}

module.exports = Dropbox
