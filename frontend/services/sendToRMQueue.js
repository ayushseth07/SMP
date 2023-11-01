const AMQP = require('amqplib');

async function sendToRMQueue(DATA) {
    try {
      
      const CONNECTION = await AMQP.connect('amqp://localhost:5672');
      const CHANNEL = await CONNECTION.createChannel();
  
      const QUEUENAME = DATA[0].receiver;
      await CHANNEL.assertQueue(QUEUENAME, { durable: false });
  
      const MESSAGE = `${DATA[0].receiver} liked your post ${DATA[0].postid}`;
      CHANNEL.sendToQueue(QUEUENAME, Buffer.from(MESSAGE));

      console.log('Data sent to RabbitMQ');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  module.exports = {sendToRMQueue}