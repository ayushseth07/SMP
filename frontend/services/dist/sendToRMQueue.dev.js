"use strict";

var amqp = require('amqplib');

function sendToRMQueue(data) {
  var connection, channel, queueName, message;
  return regeneratorRuntime.async(function sendToRMQueue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(amqp.connect('amqp://localhost:5672'));

        case 3:
          connection = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(connection.createChannel());

        case 6:
          channel = _context.sent;
          queueName = data[0].receiver;
          _context.next = 10;
          return regeneratorRuntime.awrap(channel.assertQueue(queueName, {
            durable: false
          }));

        case 10:
          message = "".concat(data[0].receiver, " liked your post ").concat(data[0].postid);
          channel.sendToQueue(queueName, Buffer.from(message)); //   channel.close();
          //   connection.close();

          console.log('Data sent to RabbitMQ');
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

module.exports = {
  sendToRMQueue: sendToRMQueue
};