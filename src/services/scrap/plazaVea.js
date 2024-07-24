import puppeteer from "puppeteer";
import fs from "fs";
import Product from '../databases/mongo.js';


async function saveOnDbResults(results, pageCurrent) {
    results.map((item) => {
        new Product(
            {
                ...item,
                createdAt: new Date(),
            }
        )
            .save()
            .then(product => {
                console.log('Product saved on page', pageCurrent, ":", product.displayName);
            })
    })
}

async function navigateAndEvaluate(page) {

    //let scriptContent = await page.content({"waitUntil": "domcontentloaded"});

    let scriptContent = await page.evaluate(() => {
        // Encuentra el primer <script> y extrae su contenido
        const scriptTag = document.querySelector('pre');

        return scriptTag ? scriptTag.textContent : null;
    });
    fs.writeFileSync('data.json', scriptContent);
    try {
        scriptContent = JSON.parse(scriptContent);
    } catch (error) {
        console.error("Error al parsear JSON:", error);
    }
    return scriptContent;
}

async function run(page, url) {

    await page.goto(url)

    //let source = await page.content({"waitUntil": "domcontentloaded"});

    let scriptContent = await navigateAndEvaluate(page);
    //const keys = Object.keys(scriptContent);
    //console.log("Contenido del script 2:", keys);
    //console.log("Contenido del script 4:", scriptContent.props.pageProps.results);

    await saveOnDbResults(scriptContent, 1);

    let { count, perPage } = scriptContent.props.pageProps.pagination
    let isMissing = parseInt(count / perPage) > 0;
    let pageCurrent = 2;
    while (isMissing) {
        await page.goto(url + '?page=' + pageCurrent + '&store=tottus')
        scriptContent = await navigateAndEvaluate(page);
        await saveOnDbResults(scriptContent, pageCurrent);
        pageCurrent++;
        count -= perPage;
        isMissing = parseInt(count / perPage) > 0;
    }

}

export default run;
