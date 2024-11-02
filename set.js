const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUloSnJnRkVxN0pobTMrdWh4TFMwd3NJSGhJL0hkY3J0U2RVZm4vbmRYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnpvSTJibGE3Q2cySDB2NWRvM3lOSnFBaitCcHpVajk1VU50dUdidkQzND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTDZqL2IzbkI1VzVFaTJlOHVYR2ZoYzQvZGcxcGFQS285NDhGeFVMVG0wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiYnROaG5KL0VNc1ZrVU9DWTQxRE1teXpWSlpkbkVMeTh2OTZUUEJjNVhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFGTVRZSU5xaFhGdUpEMnJ2blZyRXorMVFwT3RSbGo3dzBJVVlDMWV4VzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikg5ZkVkY2hQaGZ2TmxneVZXdFVtc1ZKa1VKWWk1RGZMaHd3bUJYbGNURTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0xGcEtOMUIyRlNtY0xnOXVGVEhxeDBadWEwSDAvVG9xM1ZnU2E3OGUwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3ErLzhGdWNGK2FjcmlMRkNsMm1aYVVRVnc2Zm5sY1dBRXVnTHVDYkIzVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdaWUlyalpyQWtKV2FtbkxkZWFIZnZFdFI5L0hKOGZvSVA2L0NNRlVkSHAyaUMrNndtUEV4Vkd2VFRIZ0xxN0E3akM0UzByVWRyUVFmN1kvLzlSbGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTQsImFkdlNlY3JldEtleSI6IjhmR2hCd2JRRmpVM2c1Z3VWSkYxK3B2MDluZWtOdVc2bXR6and4alFBbmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVjRnFTcmxoU2NHVUFnYnF5YmdFbEEiLCJwaG9uZUlkIjoiOGE5YjFhMzQtNGQ2Mi00NTE4LWE3ODktM2U1ZGE5ZjA2NTMxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxHWTAxdzI2TDdBNEpIdTVxRFI5WmxLSFV3ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpMXUvdTZ5eFZwL3ZQVW5IZ1lwQVFzOXJkNTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM0FUQUROUDUiLCJtZSI6eyJpZCI6Ijk0NzIyODI5Mzc3OjMwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik5PVEktVkFKSVJBIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKV2g3c2NCRUthOWw3a0dHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyMkFWUEdIWXlsejVzKzhUcHB3dG9BRUk4Y2E5Z01NUE1sTENyd0VIWmx3PSIsImFjY291bnRTaWduYXR1cmUiOiJWeC9JNHFwWmFlb1M2cGFFbjdMRWhWNm5CUXJ1NEd0d00zY1QzQlcrS3NvL25VMS82VFdjRXpGaGNVbkxkVGFNVkZBcXF2cjVGS0lETFRJMDU0ZGREUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMDNnNy9YczQzN01iNjFVdEViRzB5Z0ZGeGQ1VXZIaS9KdGcvN0Z4aEtCRGtXK2YrYkZ1czdHRHFSeVRuMkRzYVFHSkwzdk9IRTlEb09haXBWaVRoaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcyMjgyOTM3NzozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkdGdGVHhoMk1wYytiUHZFNmFjTGFBQkNQSEd2WURERHpKU3dxOEJCMlpjIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwNTM1MDkyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxGdiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Boniphace Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255716661569",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BONIPHACE MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5462ea7070b61eb790caa.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
