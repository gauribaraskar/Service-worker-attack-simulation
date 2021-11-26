'use strict'

const puppeteer = require('puppeteer');

(async() => {

  try {
    // Step 1: launch browser and open a new page.
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Step 2: Go to a URL and wait for a service worker to register.
    var url = 'https://youtube.com/'
    await page.goto(url)
    const swTarget = await browser.waitForTarget(target => target.type() === 'service_worker')

    // Step 3a: If a service worker is registered, print URL of SW file to the console 
    if(swTarget) {
      console.log(swTarget._targetInfo['url'])
    }
    // Step 4: Done. Close.
    await browser.close()

  } catch (err) {
    // The process will timeout after 30s, if no service worker is registered
    console.error(err.message)
  }
})()