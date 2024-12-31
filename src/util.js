const fs = require('fs').promises;

const getContacts = async () => {
  try {
    const data = await fs.readFile('contacts.json', 'utf8');
    const jsonObject = JSON.parse(data);
    return jsonObject;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found:', err);
    } else if (err instanceof SyntaxError) {
      console.error('Error parsing JSON:', err.message);
    } else {
      console.error('Error reading file:', err.message);
    }
  }
};

const getMessageTemplate = (contact) => {
    return `Hi ${contact?.name}!
    
    This year is going to end in a day, What do you want to change a character from me and what do you like a character from.

    Advance happy new year 2025.
    `
}

const logger = (message) => console.log(`[ ${new Date().toLocaleTimeString()} ] :: ${message}`);

const getRecipientNumber = (mobileNo='') => {
    if (mobileNo.startsWith('+')) {
        mobileNo = mobileNo.slice(1);
    }
    
    if (!mobileNo.startsWith('91') || mobileNo.length > 10) {
        mobileNo = `91${mobileNo}`;
    }
    return `${mobileNo}@c.us`;
}

const sleep = (timeInSec) => {
    return new Promise(resolve => {
      const randomDelay = Math.random() * timeInSec * 1000;
      setTimeout(resolve, randomDelay);
    });
};

module.exports = { getContacts, getMessageTemplate, logger, getRecipientNumber, sleep };
