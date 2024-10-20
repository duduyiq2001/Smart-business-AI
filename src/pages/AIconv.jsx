import React, { useEffect, useState } from "react";
import { initializeChat, sendMessage } from "../../api/getlangchain.js";
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
import { getAllTrans } from "../../api/getalltrancs.js";




function Chatbox() {
    // Define environment variables for API keys and customer information
    const APP_KEY = import.meta.env.VITE_APP_KEY;
    const token = import.meta.env.VITE_ACCESS_TOKEN;
    const customerId = import.meta.env.VITE_CUSTOMER_ID;
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    // add keys here 

    const [conversation, setConversation] = useState(null); // To store Langchain conversation instance
    const [input, setInput] = useState(""); // Input state for user messages
    const [messages, setMessages] = useState([]); // Messages state to store the conversation history

    // Send the message and get AI response
    const handleSend = async () => {
        if (input.trim() === "") return;

        // Append user message to message history
        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Send message to Langchain AI
        if (conversation) {
            const aiResponse = await sendMessage(conversation, input); // Use conversation instance
            const aiMessage = { sender: "ai", text: aiResponse };

            // Append AI message to message history
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }

        setInput(""); // Clear the input field after sending
    };

    useEffect(() => {
        const initChat = async () => {
            // Initialize the Langchain conversation instance
            const conv = await initializeChat(OPENAI_API_KEY);
            setConversation(conv);

            // Fetch transaction data from the API
            try {
                const transactions = await getAllTrans(20, customerId, APP_KEY, token);
                console.log("Fetched Transactions:", transactions); // For debugging

                // Send the transaction data to the AI in the background
                if (conv) {
                    const aiResponse = await sendMessage(conv, JSON.stringify(transactions));
                    const aiMessage = { sender: "ai", text: aiResponse };

                    // Append AI message to message history
                    setMessages((prevMessages) => [...prevMessages, aiMessage]);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        initChat();
    }, [APP_KEY, token, customerId, OPENAI_API_KEY]); // Only run when keys change

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
