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
    log('don');
    
    log(`login`);
    await login(page);
    log(`done`);
    
    log(`waitForNavigation`);
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    log(`done`);
    log(`clicks`);
    await page.mouse.move(520, 520);
    await page.mouse.move(990, 520);
    log(`done`);
    
  } catch (e) {
    log(`[start][error]`, e.message);
  } finally {
    browser.close();
  }
};

start();