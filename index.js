const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// const message = 
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: "myPersonalNumber" })
});

// Client Ready Event
client.once('ready', async () => {
    logger(`Client is ready...`);

    // client.getContactById('9132456@c.us').then(contact => {
    //     console.log(contact);
    // });
    // client.sendMessage('91812435467@c.us', 'Good Morning!').then((payload) => {
    //     console.log('Message sent!', payload);
    // });
});


// Generating QR Code
client.on('qr', qr => {
    logger(`Generated QR Code...`);
    qrcode.generate(qr, {small: true});
});

// Send and Receive Messages
client.on('message_create', message => {
    logger(`New message ✉️  from :: ${message.from} to :: ${message.to} message :: ${message.body}`);
});

const logger = (message) => console.log(`[ ${new Date().toLocaleTimeString()} ] :: ${message}`);

// Initialize the client
client.initialize();


