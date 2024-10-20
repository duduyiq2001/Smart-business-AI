import React, { useEffect, useState } from "react";
import { getAllTrans } from "../../api/getalltrancs.js";
import { getclient, getAIResponse } from "../../api/getaires.js";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

function Chatbox() {
    const APP_KEY = import.meta.env.VITE_APP_KEY;
    const token = import.meta.env.VITE_ACCESS_TOKEN;
    const customerId = import.meta.env.VITE_CUSTOMER_ID;
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

    const [openai, setOpenai] = useState(null); // OpenAI client instance
    const [input, setInput] = useState(""); // Input state for user messages
    const [messages, setMessages] = useState([]); // Messages state to store the conversation history
    const [context, setContext] = useState(""); // Store conversation history manually
    const [transactionLoaded, setTransactionLoaded] = useState(false); // Check if transactions are loaded

    // Send the message and get AI response
    const handleSend = async () => {
        if (input.trim() === "" || !openai) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Update the context (append user's message to conversation history)
        const updatedContext = `${context}\nUser: ${input}`;
        setContext(updatedContext);

        if (openai) {
            const aiResponse = await getAIResponse(openai, updatedContext);
            const aiMessage = { sender: "ai", text: aiResponse.content }; // Update to use `content`

            // Append AI message to the conversation history and messages
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            setContext((prevContext) => `${prevContext}\nAI: ${aiResponse.content}`);
        }

        setInput(""); // Clear the input field after sending
    };

    useEffect(() => {
        const initChat = async () => {
            try {
                // Initialize the OpenAI client
                const client = await getclient(OPENAI_API_KEY);
                setOpenai(client);

                // Fetch transaction data from the API and send it to the AI
                const transactions = await getAllTrans(20, customerId, APP_KEY, token);
                console.log("Fetched Transactions:", transactions);

                if (!transactionLoaded) {
                    // Send the transaction data to the AI once, add it to context
                    const aiResponse = await getAIResponse(client, JSON.stringify(transactions));
                    const aiMessage = { sender: "ai", text: aiResponse.content };
                    setMessages((prevMessages) => [...prevMessages, aiMessage]);
                    setContext(`AI: ${aiResponse.content}`); // Initialize the context with AI response
                    setTransactionLoaded(true); // Set the flag to true so that this only runs once
                }

            } catch (error) {
                console.error("Error initializing chat or fetching transactions:", error);
            }
        };

        // Run only once after initial rendering
        if (!transactionLoaded) {
            initChat();
        }
    }, [APP_KEY, token, customerId, OPENAI_API_KEY, transactionLoaded]);

    // To avoid double messaging, handleSend is triggered only by user input
    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                AI Chatbox
            </Typography>

            <Box
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    height: "400px",
                    overflowY: "scroll",
                    marginBottom: "16px",
                }}
            >
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{ color: message.sender === "user" ? "blue" : "green" }}
                                    >
                                        {message.sender === "user" ? "You" : "AI"}: {message.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSend}>
                    Send
                </Button>
            </Box>
        </Container>
    );
}

export default Chatbox;
