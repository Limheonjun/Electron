// Modules
const {app, BrowserWindow, webContents} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  let wc = mainWindow.webContents

  wc.on('did-finish-load', () => {
    console.log('Content fully loaded')
  })

  wc.on('dom-ready', () => {
    console.log('DOM Ready')
  })

  wc.on('new-window', (e, url) => {
    e.preventDefault()
    console.log(`Creating new window for : ${url}`)
  })

  wc.on('before-input-event', (e,input) => {
    console.log(`${input.key} : ${input.type}`)
  })

  wc.on('did-navigate', (e,url,statusCode, message) => {
    console.log(`Navigated to : ${url}`)
    console.log(statusCode)
  })

  wc.on('login', (e,result,authInfo, callback) => {
    console.log(`Logging in:`)
    callback('user', 'passwd')
  })

  wc.on('media-started-playing', () => {
    console.log('Video Started')
  })

  wc.on('media-paused', () => {
    console.log('Video paused')
  })

  wc.on('context-menu', (e, params) => {
    console.log(`Context menu opened on : ${params.mediaType} at x:${params.x}, y:${params.y}`)
    console.log(`User selected text : ${params.selectionText}`)
    console.log(`Selection can be copied : ${params.editFlags.canCopy}`)
    let selectedText = params.selectionText
    wc.executeJavaScript(`alert("${selectedText}")`)
  })

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
