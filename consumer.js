const amqp = require('amqplib')

const queueName = process.argv[2] ||  "jobsQueue"

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const assertation = await channel.assertQueue(queueName)

        console.log('Waiting for messages')

        channel.consume(queueName, message => {
            const messageInfo = JSON.parse(message.content.toString())
            
            console.log(messageInfo)

            channel.ack(message)
        })
    } catch (error) {
        console.log("Error", error)
    }   
}

connect_rabbitmq()