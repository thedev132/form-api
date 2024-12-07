const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Forum and Reply API Documentation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    header {
                        background: #007bff;
                        color: white;
                        padding: 20px;
                        text-align: center;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                    }
                    pre {
                        background: #f9f9f9;
                        border-left: 4px solid #007bff;
                        padding: 15px;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        overflow: auto;
                    }
                    .endpoint {
                        margin-bottom: 20px;
                    }
                    .method {
                        font-weight: bold;
                        color: #007bff;
                    }
                    .response {
                        background: #eef;
                        border: 1px solid #007bff;
                        padding: 10px;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Forum API Documentation</h1>
                    <p>Version 1.0</p>
                </header>
                <div class="container">

                    <!-- Fetch all forums -->
                    <section class="endpoint">
                        <h2>GET /api/forums</h2>
                        <p>Fetches a list of all forums with their replies.</p>
                        <h3>Request</h3>
                        <pre>
            GET /api/forums HTTP/1.1
                        </pre>
                        <h3>Response</h3>
                        <div class="response">
                            <pre>
            200 OK
            [
                {
                    "id": 1,
                    "title": "Forum Title 1",
                    "name": "John Doe",
                    "email": "john@example.com",
                    "message": "This is the forum message.",
                    "replies": [
                        {
                            "id": 1,
                            "name": "Jane Doe",
                            "reply": "This is a reply.",
                            "formId": 1
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Forum Title 2",
                    "name": "Alice",
                    "email": "alice@example.com",
                    "message": "Another forum message.",
                    "replies": []
                }
            ]
                            </pre>
                        </div>
                    </section>

                    <!-- Create a new forum -->
                    <section class="endpoint">
                        <h2>POST /api/forums</h2>
                        <p>Creates a new forum entry.</p>
                        <h3>Request</h3>
                        <pre>
            POST /api/forums HTTP/1.1
            Content-Type: application/json

            {
                "title": "New Forum Title",
                "name": "John Doe",
                "email": "john@example.com",
                "message": "This is the forum content."
            }
                        </pre>
                        <h3>Response</h3>
                        <div class="response">
                            <pre>
            201 Created
            {
                "id": 3,
                "title": "New Forum Title",
                "name": "John Doe",
                "email": "john@example.com",
                "message": "This is the forum content.",
                "replies": []
            }
                            </pre>
                        </div>
                    </section>
                            <!-- Fetch a single forum -->
                    <section class="endpoint">
                        <h2>GET /api/forums/:id</h2>
                        <p>Fetches details of a specific forum by its ID, including its replies.</p>
                        <h3>Request</h3>
                        <pre>
            GET /api/forums/1 HTTP/1.1
                        </pre>
                        <h3>Response</h3>
                        <div class="response">
                            <pre>
            200 OK
            {
                "id": 1,
                "title": "Forum Title 1",
                "name": "John Doe",
                "email": "john@example.com",
                "message": "This is the forum message.",
                "replies": [
                    {
                        "id": 1,
                        "name": "Jane Doe",
                        "reply": "This is a reply.",
                        "formId": 1
                    }
                ]
            }
                            </pre>
                        </div>
                    </section>

                    <!-- Get replies for a forum -->
                    <section class="endpoint">
                        <h2>GET /api/forums/:id/replies</h2>
                        <p>Fetches all replies for a specific forum.</p>
                        <h3>Request</h3>
                        <pre>
            GET /api/forums/1/replies HTTP/1.1
                        </pre>
                        <h3>Response</h3>
                        <div class="response">
                            <pre>
            200 OK
            [
                {
                    "id": 1,
                    "name": "Jane Doe",
                    "reply": "This is a reply to the forum.",
                    "formId": 1
                },
                {
                    "id": 2,
                    "name": "Alice",
                    "reply": "Another reply.",
                    "formId": 1
                }
            ]
                            </pre>
                        </div>
                    </section>

                    <!-- Add a reply to a forum -->
                    <section class="endpoint">
                        <h2>POST /api/forums/:id/replies</h2>
                        <p>Adds a reply to an existing forum.</p>
                        <h3>Request</h3>
                        <pre>
            POST /api/forums/1/replies HTTP/1.1
            Content-Type: application/json

            {
                "name": "Jane Doe",
                "reply": "This is a reply to the forum."
            }
                        </pre>
                        <h3>Response</h3>
                        <div class="response">
                            <pre>
            201 Created
            {
                "id": 1,
                "name": "Jane Doe",
                "reply": "This is a reply to the forum.",
                "formId": 1
            }
                            </pre>
                        </div>
                    </section>
                </div>
            </body>
            </html>
        `
    );
});


module.exports = router;
