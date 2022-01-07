// =========== Swagger Doc ============================
const swaggerJsDoc = require('swagger-jsdoc')

// Extended : https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title: "RoosterMusic API",
            description: "Details about RoosterMusic House",
            contact: {
                name: "RoosterMusic"
            },
            servers: ["https:localhost:3000"]
        }
    },

    apis: ["app.js", "./routes/api/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs  //Export swaggerDocs