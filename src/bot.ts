import { Telegraf } from "telegraf";
import * as HtmlParser from 'node-html-parser';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? '');
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', async (ctx) => {
    const paper = ctx.message?.text;
    if (!paper) return;

    let result = 'Error trying to get bibtex';
    try {
        const paperHtml = (await axios.get(`https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=${paper}`)).data;
        const citeId = HtmlParser.parse(paperHtml).querySelectorAll('div.gs_ri h3 a')[0]?.getAttribute('id') ?? undefined;
        if (citeId) {
            const citeHtml = (await axios.get(`https://scholar.google.de/scholar?hl=de&q=info:${citeId}:scholar.google.com/&output=cite&scirp=0`)).data;
            const bibtexUrl = HtmlParser.parse(citeHtml).querySelectorAll('div#gs_citi a')[0]?.getAttribute('href') ?? undefined;
            if (bibtexUrl) {
                result = (await axios.get(bibtexUrl)).data;
                result = `<code>${result}</code>`;
            }
        }
    } catch (error) {
        console.error('Error');
    }
    ctx.reply(result, { parse_mode: 'HTML' });

});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
console.log('Bot started');