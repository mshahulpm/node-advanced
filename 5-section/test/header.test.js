const puppeteer = require('puppeteer');
let browser, page;

beforeEach(async () => {

    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3002')
})


afterEach(async () => {
    await page.close()
    await browser.close()
})

test('We can launch browser', async () => {


    const text = await page.$eval('header h3', el => el.innerHTML)

    expect(text).toEqual('Logo')


})