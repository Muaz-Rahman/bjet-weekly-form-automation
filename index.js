const puppeteer = require('puppeteer-core');
const dotenv = require("dotenv").config();
const answers = require('./answers');


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
        const weekOption = await page.$(`div[aria-labelledby="i1"] >>> div[ssk="6:Rxil4c"] >>> div[data-value=${"Week" + answers.week}]`);
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
                    await textFieldElement.type(answers.weeklyWritten);
                    break;
                case 2:
                    await textFieldElement.type(answers.weeklyOral);
                    break;
                case 3:
                    await textFieldElement.type(answers.goodPoint);
                    break;
                default:
                    break;
            }
        }

        //writes the improvement goal
        const textAreaElement = await page.$(`textarea[aria-labelledby="i56"]`);
        await textAreaElement.type(answers.improvementGoal);

        //understandability radio buttons
        const understandabilityRadioJL = await page.$(`div[aria-labelledby="i48"] >>> div[aria-label="JL Class"] >>> div[data-value="${answers.understandabilityLevel[5]}"]`);
        const understandabilityRadioPD = await page.$(`div[aria-labelledby="i48"] >>> div[aria-label="PD Session"] >>> div[data-value="${answers.understandabilityLevel[5]}"]`);
        await understandabilityRadioJL.click()
        await understandabilityRadioPD.click()

        //attendance radio buttons
        let index = 0;
        for (const attendanceScore of answers.attendanceArray) {
            console.log(index)
            const attendanceRadioJL = await page.$(`div[aria-labelledby="i13"] >>> div[data-field-index="${index}"] >>> div[data-value="${answers.attendanceArray[index]}"]`);
            await attendanceRadioJL.focus()
            await attendanceRadioJL.click()
            index += 1;
        }

        //daily quiz radio buttons
        index = 0;
        for (const dailyQuizScore of answers.dailyQuizArray) {
            const dailyQuizRadioJL = await page.$(`div[aria-labelledby="i25"] >>> div[data-field-index="${index}"] >>> div[data-value="${answers.dailyQuizArray[index]}"]`);
            await dailyQuizRadioJL.click()
            index += 1;
        }

    } catch (e) {
        console.log(e)
    }
})()
