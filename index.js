const puppeteer = require('puppeteer-core');
const dotenv = require("dotenv").config();
const readline = require('readline');
const questions = require('./answers')

let goodPoint = questions.goodPoint;

(async () => {
    try {
        const checkBoxSelectorArray = ['div#i22', 'div#i42', 'div#i45']
        const textFieldArray = ['i9', 'i29', 'i33', 'i52']

        const browser = await puppeteer.launch({
            executablePath: process.env.EDGE_LOCATION,
            headless: false,
            waitForInitialPage: true,
        });
        const page = await browser.newPage();
        await page.goto(process.env.FORM_LINK,
            {waitUntil: 'networkidle2'});

        //selects the week dropdown, then selects the option
        const weekDropdown = await page.$('div[aria-labelledby="i1"]');
        await weekDropdown.click()
        await page.waitForSelector("div[aria-labelledby=\"i1\"] >>> div[ssk=\"6:Rxil4c\"] >>> div[data-value=\"Week1\"]",
            {visible: true, timeout: 10000})
        const weekOption = await page.$(`div[aria-labelledby="i1"] >>> div[ssk="6:Rxil4c"] >>> div[data-value=${"Week" + questions.week}]`);
        await weekOption.click()
        await new Promise(resolve => setTimeout(resolve, 500))

        //selects the id dropdown, then selects the option
        const idDropdown = await page.$('div[aria-labelledby="i5"]');
        await idDropdown.click()
        await page.waitForSelector("div[aria-labelledby=\"i5\"] >>> div[ssk=\"6:Rxil4c\"] >>> div[data-value=\"BB13001\"]",
            {visible: true, timeout: 10000})
        const idOption = await page.$(`div[aria-labelledby="i5"] >>> div[ssk="6:Rxil4c"] >>> div[data-value=${process.env.ID}]`);
        await idOption.click()
        await new Promise(resolve => setTimeout(resolve, 500))

        //checks all the checkboxes
        for (const checkBoxSelector of checkBoxSelectorArray) {
            await page.$(checkBoxSelector).then((el) => el.click())
        }

        //for each question, types the relevant answer
        for (const element of textFieldArray) {
            const index = textFieldArray.indexOf(element);
            const textFieldElement = await page.$(`input[aria-labelledby="${element}"]`);
            await new Promise(resolve => setTimeout(resolve, 500))
            switch (index) {
                case 0:
                    await textFieldElement.type(process.env.NAME);
                    break;
                case 1:
                    await textFieldElement.type(questions.weeklyWritten);
                    break;
                case 2:
                    await textFieldElement.type(questions.weeklyOral);
                    break;
                case 3:
                    await textFieldElement.type(questions.goodPoint);
                    break;
                default:
                    break;
            }
        }

        //writes the improvement goal
        const textAreaElement = await page.$(`textarea[aria-labelledby="i56"]`);
        await textAreaElement.type(questions.improvementGoal);

        // setTimeout(() => {
        //     browser.close()
        // }, 10000)
    } catch (e) {
        console.log(e)
    }
})()
