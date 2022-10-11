const amqp = require('amqplib')

const queueName = process.argv[2] ||  "jobsQueue"

const message = {
    date: null,
    description: 'Hello there!'
}

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const assertation = await channel.assertQueue(queueName)

        setInterval(() => {
            message.date = Date.now()

            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log('Message send')
        }, 1000)
    } catch (error) {
        console.log("Error", error)
    }   
}

connect_rabbitmq()