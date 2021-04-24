import { App } from '@slack/bolt';
import * as dotenv from "dotenv";
import * as fs from 'fs';


dotenv.config();
const app = new App({
    token: process.env.OAUTH_TOKEN,
    signingSecret: process.env.SIGNING_SECRET
});

export async function sendMessageToSlack(userId: string, message: string) {
    const result = app.client.chat.postMessage({
        token: process.env.OAUTH_TOKEN,
        channel: userId,
        text: message,
    });
}

export async function sendFileToSlack(date: string, userId: string) {
    const result = app.client.files.upload({
        token: process.env.OAUTH_TOKEN,
        channels: userId,
        initial_comment: 'GMO Yours' + date + ' 予約成功',
        title: 'yours-order',
        file: fs.createReadStream('./yours-order.png'),
    });
}

export default sendFileToSlack;