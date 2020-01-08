const { createClient } = require('webdav')
const { isNode } = require('browser-or-node')
const mime = require('mime')

class NutCloud {
  constructor(options = {}) {
    const {
      server,
      username,
      password,
    } = options
    if (!server || !username || !password) {
      throw new Error('server, username, password required')
    }

    this.client = createClient(server, { username, password })
  }

  async ping() {
    try {
      await this.createDir('hello')
      return true
    } catch (e) {
      console.warn(e.response.status)
      return false
    }
  }

  async list(dir = '/') {
    return this.client.getDirectoryContents(dir, { deep: false })
  }

  async upload(options = {}) {
    const {
      dest,
      content,
      onUploadProgress,
    } = options
    if (!dest || !content) {
      throw new Error('dest and content are required')
    }
    const type = options.type || mime.getType(dest)
    const body = isNode ? content : new Blob([content], { type })

    if (type === 'text/plain') {
      return this.client.putFileContents(dest, content, { onUploadProgress })
    }
    return this.client.putFileContents(dest, body, { overwrite: false, onUploadProgress })
  }

  async createDir(dir) {
    if (dir === '') {
      return new Error('directory name required')
    }
    return this.client.createDirectory(dir)
  }

  getItem(path, options = {}) {
    if (options.type) {
      return this.client.getFileContents(path, { format: options.type })
    }
    return this.client.getFileContents(path)
  }
}

module.exports = NutCloud
