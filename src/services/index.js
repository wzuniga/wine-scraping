import puppeteer from "puppeteer";
import Product from './databases/mongo.js';
import Tottus from './scrap/tottus.js';
import PlazaVea from './scrap/plazaVea.js';
//import espn from './scrap/espn.js';

async function initWebPage() {
    const browser = await puppeteer.launch({
        headless: true,
        //slowMo: 400
    });
    let page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
    return { browser, page };
}

async function closeWebPage(browser) {
    await browser.close()
}

async function init() {
    const { browser, page } = await initWebPage();

    await Tottus(page, 'https://tottus.falabella.com.pe/tottus-pe/category/CATG15694/Pisco');
    //await Tottus(page, 'https://tottus.falabella.com.pe/tottus-pe/category/CATG15620/Vino-tinto');
    //await Tottus(page, 'https://tottus.falabella.com.pe/tottus-pe/category/CATG15619/Vino-blanco');
    //await Tottus(page, 'https://sodimac.falabella.com.pe/sodimac-pe/category/cat6370551/Televisores-LED');
    
    //await PlazaVea(page, 'https://www.plazavea.com.pe/api/catalog_system/pub/products/search?fq=C:/2/9/14/');

    closeWebPage(browser);
    //espn()

}

init();
