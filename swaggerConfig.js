const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Form API Documentation",
            version: "1.0.0",
            description: "API for managing forms and replies.",
        },
        servers: [
            // {
            //     url: "http://localhost:3030",
            //     description: "Local server",
            // },
            {
                url: "https://forum-api-nine.vercel.app/",
                description: "Production server",
            },
        ],
    },
    apis: ["./routes/*.js"], 
};

module.exports = swaggerJsDoc(options);
