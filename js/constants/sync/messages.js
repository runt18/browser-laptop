'use strict'

const _ = null

const mapValuesByKeys = (o) =>
  Object.keys(o).reduce((newObject, k) => {
    newObject[k] = k.toLowerCase().replace(/_/g, '-')
    return newObject
  }, {})

// Messages between webview and main browser process
const messages = {
  /**
   * webview -> browser
   * used for debugging in environments where the webview console output is not
   * easily accessible, such as in browser-laptop.
   */
  SYNC_DEBUG: _, /* @param {string} message */
  /**
   * webview -> browser
   * browser sends GOT_INIT_DATA with the saved values
   */
  GET_INIT_DATA: _,
  /**
   * browser -> webview
   * browser must send null for seed or deviceId if a value has not yet been
   * saved. 'config' contains apiVersion, serverUrl, debug;
   * see server/config/default.json
   */
  GOT_INIT_DATA: _, /* @param {Array} seed, @param {Array} deviceId, @param {Object} config */
  /**
   * webview -> browser
   * browser must save values in persistent storage if non-empty
   */
  SAVE_INIT_DATA: _, /* @param {Uint8Array} seed, @param {Uint8Array} deviceId */
  /**
   * webview -> browser
   * sent when sync has finished initialization
   */
  SYNC_READY: _,
  /**
   * browser -> webview
   * sent to fetch sync records after a given start time from the sync server.
   */
  FETCH_SYNC_RECORDS: _, /* @param Array.<string> categoryNames, @param {number} startAt (in seconds) */
  /**
   * webview -> browser
   * browser must update its local values with the new sync records, performing
   * conflict-resolution as necessary.
   */
  RECEIVE_SYNC_RECORDS: _, /* @param {string} categoryName, @param {Array.<Object>} records */
  /**
   * browser -> webview
   * browser sends this to the webview with the data that needs to be synced
   * to the sync server.
   */
  SEND_SYNC_RECORDS: _ /* @param {string} categoryName, @param {Array.<Object>} records */
}

module.exports = mapValuesByKeys(messages)
