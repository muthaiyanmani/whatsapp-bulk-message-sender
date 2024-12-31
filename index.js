const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { getContacts, logger, getMessageTemplate, getRecipientNumber, sleep } = require("./src/util");
 
// const message = 
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: "myPersonalNumber" })
});

client.once('ready', async () => {
    logger(`Client is ready...`);

    const contacts = await getContacts();

    for(let contact of contacts){
        const messageTemplate = getMessageTemplate(contact);
        const mobileNumber = contact?.number;
        const toAddress = getRecipientNumber(mobileNumber);

        await client.sendMessage(toAddress, messageTemplate);
        logger(`Messent sent to ${contact.name}`);

        await sleep(4);
    }  
});


// Generating QR Code
client.on('qr', qr => {
    logger(`Generated QR Code...`);
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    logger(`New message ✉️  from :: ${message.from} to :: ${message.to} message :: ${message.body}`);
});


// Initialize the client
client.initialize();
