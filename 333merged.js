const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const moment = require('moment');

(async function main(){
    try {
        const browser = await puppeteer.launch({ headless: true }); // headless true/false
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36');
        await page.goto('http://egb.com/play/simple_bets');
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

        // merged scrape
        const merged = await page.$$('div.table-bets__main-row-holder');
        console.log('all divs are selected');
        let now = moment().format('h:mm:ss a');
        await fs.writeFile(`out ${now}.csv`, 'team1,odds1,team2,odds2\n');

        for (const row of merged) {
            const table = await row.$eval('div.table-bets__cols-holder', div => div.innerText);
            console.log('table flipped');
            retable = table.replace(/\n/ig, ',');
            console.log('table data:', retable);
            await fs.appendFile(`out ${now}.csv`, `${retable}\n`);
        };

    console.log('done');
    await browser.close();
    } catch (e) {
        console.log('our error', e);
    }
})();
