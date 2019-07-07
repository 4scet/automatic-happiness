const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const moment = require('moment');


(async function main(){
    try {
        const browser = await puppeteer.launch({ headless: false }); // headless true/false
        //const context = await browser.createIncognitoBrowserContext();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36');
        await page.goto('http://egb.com/play/simple_bets', {waitUntil: 'networkidle2'});
        //await page.waitFor(1000);
        console.log('page loaded');
        await page.waitForSelector('.tabs.js-tabs.tabs--top');
        console.log('react table loaded');
        await page.click('button.filters__link-clear');
        console.log('filters are cleared (clicked)');
        await page.click('.field.filters__check-item[title="Counter-Strike"]');
        console.log('table filtered by csgo');
        await page.click('.filters__right-side');
        console.log('more filters unfolded');
        await page.click('button.act.filters__table-style-link[data-title="Future matches first"]');
        console.log('only future matches');

        const timenow = moment().format('h_mm_ss');
        // await fs.writeFile(`out ${timenow}.csv`, 'team1,odds1,team2,odds2\n');
        // merged scrape
        const merged = await page.$$('div.table-bets__main-row-holder');
        console.log('all divs are selected');

        for (const row of merged) {
            const table = await row.$eval('div.table-bets__cols-holder', div => div.innerText);
            let retable = await table.replace(/\n/ig, ',');
            console.log('table data:', retable);
            await fs.appendFile(`csgo scraped ${timenow}.csv`, `${retable}\n`);
        };

    console.log('csgo matches fetched', timenow);
    
    await browser.close();
    
    } catch (e) {
        console.log('our error', e);
    }
})();
