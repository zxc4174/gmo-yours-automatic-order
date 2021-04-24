import { IAccount, IPeriod } from '../types/types';
import sendFileToSlack, { sendMessageToSlack } from './slack-notice';
import moment from 'moment-timezone';
import puppeteer from 'puppeteer';


/**
 * process:
 * 1.login
 * 2.check last order date
 * 3.order
 * 4.send to slack
 */
export async function reserveGmoYours(account: IAccount, date: string, period: IPeriod) {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    // 1.login 
    await page.goto('https://esp03.dt-r.com/gmo-yours/member/login.php');
    await page.type("input[name='login_id']", account.email as string);
    await page.type("input[name='login_passwd']", account.password as string);
    await Promise.all([
        page.click('.button_next'),
        page.waitForNavigation()
    ]);

    // 2.check last order date
    await page.goto('https://esp03.dt-r.com/gmo-yours/member/booking_list.php?mode=reservation', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#info_list');
    const list = await page.$$eval("#info_list p", (elements: any[]) => elements.map(item => item.textContent.trim()));
    const lastOrderDate = list[1].match(/[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])/g);

    if (moment().isAfter(moment(lastOrderDate[0], 'YYYY-MM-DD'), 'day')) {
        // 3.order
        await page.goto('https://esp03.dt-r.com/gmo-yours/booking/booking.php?search_main_plan_id=1');
        await page.waitForSelector('#res_num_select');
        await page.select('#res_num_select', '2');

        await page.goto(`https://esp03.dt-r.com/gmo-yours/booking/booking.php?action=conf&from=table&main_plan_id=1&sub_plan_id=1&calendar_day=${date}&calendar_start_unixtime=${period.calendar_start_unixtime}&calendar_end_unixtime=${period.calendar_end_unixtime}`);
        await Promise.all([
            page.click('.button_next'),
            page.waitForNavigation()
        ]);

        if (await page.$('.exclamation') !== null) {
            const result = await page.$$eval(".exclamation p", (elements: any[]) => elements.map(item => item.textContent.trim()));
            const bookingId = result[1].replace('予約番号:', '');
            await page.goto(`https://esp03.dt-r.com/gmo-yours/member/booking_info.php?booking_id=${bookingId}&mode=reservation`);
            await page.screenshot({ path: 'yours-order.png', fullPage: true });
            // 4.send to slack
            sendFileToSlack(date, account.id as string);
            console.log('succeeded');
        } else {
            console.log('failed');
        }
    }
    await browser.close();
    // sendMessageToSlack(account.id as string, '【test】program is executed');
}

export default reserveGmoYours;
