import { IAccount, IPeriod } from './types/types';
import reserveGmoYours from './helpers/gmo-yours';
import * as dotenv from "dotenv";
import moment from 'moment-timezone';


dotenv.config();

// accounts list
const accounts: IAccount[] = [{
    id: process.env.ID,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
},
];

// set next wednesday date
const date: string = moment().day(3).add(7, 'days').format('YYYY-MM-DD');
const period: IPeriod = {
    calendar_start_unixtime: moment(date + ' 12:15').tz('Asia/Tokyo').unix(),
    calendar_end_unixtime: moment(date + ' 12:25').tz('Asia/Tokyo').unix()
};

// run 
(() => {
    accounts.forEach(account => {
        reserveGmoYours(account, date, period);
    });
})();