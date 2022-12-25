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

test('Check if the header have correct text', async () => {


    const text = await page.$eval('header h3', el => el.innerHTML)

    expect(text).toEqual('Logo')


})

test('invalid username', async () => {

    await page.type('#login input[name="username"]', 'hello')
    await page.click('#login button')

    const text = await page.$eval('#login-toast', el => el.innerHTML)

    expect(text).toEqual('Invalid username')
})

test('invalid password', async () => {

    await page.type('#login input[name="username"]', 'shahul')
    await page.type('#login input[name="password"]', 'shahul')
    await page.click('#login button')

    const text = await page.$eval('#login-toast', el => el.innerHTML)

    expect(text).toEqual('Invalid password')
})

test('login success', async () => {

    await page.type('#login input[name="username"]', 'shahul')
    await page.type('#login input[name="password"]', 'shahul123')
    await page.click('#login button')

    const text = await page.$eval('#login-toast', el => el.innerHTML)

    expect(text).toEqual('Login success')
})