const puppeteer = require('puppeteer');
const isSilentMode = false;
const url = `https://campaign.aliexpress.com/wow/gf/upr-cs?wh_pid=tmall_BF_Game&wh_weex=true&_immersiveMode=true&wx_navbar_hidden=true&wx_navbar_transparent=true&ignoreNavigationBar=true&wx_statusbar_hidden=true&preDownLoad=true&preInitInstance=rax&aff_platform=promotion&cpt=1574429535635&sk=nHz3rGy0&aff_trace_key=12b208907d2f4fbba614724cf3504126-1574429535635-00145-nHz3rGy0&terminal_id=d8d2fcbe79fe42f0a42f741f2af7555e`;

const log = (text, params = '') => {
  console.log(`${new Date().toISOString()} -> ${text}`, params);
};

async function login(page) {
  await Promise.all([
    page.$eval('.sign-btn', node => node.click()),
    page.waitForNavigation({waitUntil: 'networkidle0'}),
  ]);
  const frame = page.frames().find(frame => frame.name() === 'alibaba-login-box');
  await frame.type('#fm-login-id', 'flex62ryz@ya.ru');
  await frame.type('#fm-login-password', 'Abcd1234');
  await frame.click('[type=submit]');
}

const start = async () => {
  
  if (!url)
    throw new Error(`Url required.`);
  
  const browser = await puppeteer.launch({
    args: [`--no-sandbox`],
    headless: isSilentMode,
    defaultViewport: {width: 1200, height: 800}
  });
  
  try {
    const page = await browser.newPage();
    
    log(`[goto] `, url);
    await page.goto(url, {waitUntil: 'networkidle0'});
    log('done');
    
    // log(`.user-account-inner`);
    // await page.click('.user-account-inner');
    // log(`done`);
    
    log(`.sign-btn`);
    // const loginUrl = await page.$eval('.sign-btn', node => node.getAttribute('href'));
    // await page.$eval('.sign-btn', node => node.click());
    log(`done`);
    
    await login(page);
    // await page.waitForNavigation();
    
    // await page.waitFor('[exp_type="coupon_exposure"]', { visible: true });
    // await page.$$eval('[exp_type="coupon_exposure"]', (nodes) => {
    //   nodes.forEach(node => node.click());
    // })
    await page.mouse.move(520, 520);
    await page.mouse.move(990, 520);
    
  } catch (e) {
    log(`[start][error]`, e.message);
  } finally {
    // browser.close();
  }
};

start();