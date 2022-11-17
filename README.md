# bibtex-bot
Get bibtex for a paper from Telegram

Query the bot for a paper by its title, doi, ... and it will return the bibtex for the paper.


## How it works
The bot will search the query on google scholar and return the bibtex for the first result.

## How to run
0. Install [Node.js](https://nodejs.org/en/)
1. Clone the repo
2. Create a file called `.env` in the root directory of the project containing your telegram bot token
```
BOT_TOKEN=<your-bot-token>
```
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run the project: `npm start`

## Credits
Part of the code was inspired from [scholarBibTex](https://github.com/Kildrese/scholarBibTex) from @Kildrese



