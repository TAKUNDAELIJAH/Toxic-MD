const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdBRERhdlJoY0twcDhmUXNSUUFYWlIxNEdtVjNyQ0VDWVNSOEhGTUltZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHpzUFJZREs3VlBQbHh2ampHMldBZFFuaks0SGY3cFUzUk91enIwSHppST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRHUzYWUrT2FiSXNKaVQwcFJGMXYrVnE2QVZCSFVhYUx4Z2YvTUhaSkg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZM1F6RENNbVRzL1Nhdm1iai83bFVPMlArUFZZZFdoYTJxYm80d2pIbndFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMZm1ncCtwT0lzL2ExSFVzeU5CRVhTQ1Fpdi9hSkJmMkFWTFJZUnhHMjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlVbGZZTVBSWGpoY1RkajRNRk1QWUZCVkdHelhQU0poNGo0U1doZFNNMUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFLT1VKU05TSXVxbVJKRlptYVRQRlh4RUd5Z1ByeDB2Y0Z2bjh6eG5Waz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTZtdEVNNDlibWNubDVXNWV0aVhicEErR2VFZW9xcXJKMHI5UHh5Y2RqMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9wVkEwVFgyZmQ5WHVSeTlFUk9nTWxkd0RrdkhXUkVtY3QweGVBU29qYSsveG5kbzJVUEo1NVFKTmttNjVpVHpBNWNGdTJ5Tnl5MzhnYkNHODhqUERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6IndhdW9QTHJxaW5BODJGczR5Nyt2c0VCK2NuemtDVTRwL1Bmczh2WjkwRjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImE3TnY1SlpIVDc2ZXRhcnBSMGp6MXciLCJwaG9uZUlkIjoiZWUyOTMzOWYtOGZjOS00NzFiLTk0MDAtNTQyOThlODAwZTFiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilo4RTdxM0hma3E1d28zTjZXYWZPMDZwQ3JIcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2NkI4dTJmaWVRcEhrMkZoaitJeFJDalU4dDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUJDRDEyMzQiLCJtZSI6eyJpZCI6IjI2Mzc4MTI2NTQ0OToyMkBzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijg5NzE4MTc1ODgzMjY1OjIyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWZ1OEtBRkVLMlk0TUlHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL2lzRXFJYWZOOVM2SkJ3ZmVQWFVNWnIyZTdySzBvMUQxS3BVR0t1bjAzcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidlljdEY1azFWSnF5cm5wNFJFU2FtSnF3WXZYOVhpd2JIUjlnTUdzRmJTSW03UStYY2JoRkRlTVNxTmpwMlNBODA0L0ltZ0RPZ3hnb1RVa0dIS2ZNQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjQySXVFN2VpNGRTTDR4SWxOdTJGanZvY0liY3pRWFYreG1mK0NJSytCa3RCRVlGcVZTTDJaMXVxMFBCT2Mzc01rbnhlOElMZ0xzandjV05jS0lPaUJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxMjY1NDQ5OjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmY0ckJLaUduemZVdWlRY0gzajExREdhOW51Nnl0S05ROVNxVkJpcnA5TjcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDYwMDc2M30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cyberking",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263781265449",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
