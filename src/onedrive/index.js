const { fetch } = require('whatwg-fetch')
const mime = require('mime')
const { isNode } = require('browser-or-node')

const root = 'https://graph.microsoft.com/v1.0/drive/root:'

class OneDrive {
  constructor(token) {
    this.token = token
  }

  async upload(options = {}) {
    const {
      dest,
      content,
    } = options;
    if (!dest || !content) {
      throw new Error("dest and content are required")
    }

    const type = options.type || mime.getType(dest)

    const body = isNode ? content : new Blob([content], { type })
    const url = `${root}/${dest}:/content`
    const opt = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': type,
      },
      body,
    }
    return fetch(url, opt)
  }

  // TODO
  async list(dir) {}
  async download() {}
}

module.exports = OneDrive
