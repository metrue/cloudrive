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
  async list(dir) {
    const resp = await this.getItem(dir)
    if (resp.ok) {
      const item = await resp.json()
      return this.children(item.id)
    }
    throw new Error('could not get item with path name', dir)
  }

  async download(path) {
    const opt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${path}:/content`
    return fetch(url, opt)
  }

  async getItem(path) {
    const opt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }

    const root = `https://graph.microsoft.com/v1.0/me/drive/root:/${path}`
    return fetch(root, opt)
  }

  async children(id) {
    const opt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }

    const root = `https://graph.microsoft.com/v1.0/me/drive/items/${id}/children`
    return fetch(root, opt)
  }
}

module.exports = OneDrive
