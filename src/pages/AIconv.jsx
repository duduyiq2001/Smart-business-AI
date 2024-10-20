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
    //load env parameters
    // const APP_KEY = process.env.REACT_APP_OPENAI_API_KEY?.trim();
    // const token = process.env.REACT_APP_ACCESS_TOKEN?.trim();
    // const customerId = process.env.REACT_APP_CUSTOMER_ID
    const APP_KEY = "d70229e65358256353ec3d718315b611";
    const token = "fIk7mbzScghMUwXjW6QQ";
    const customerId = "7033717872";

    const OPENAI_API_KEY =
        "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";

    const [conversation, setConversation] = useState(null); // To store Langchain conversation instance
    const [input, setInput] = useState(""); // Input state for user messages
    const [messages, setMessages] = useState([]); // Messages state to store the conversation history
    // Send the message and get AI response
    const handleSend = async () => {
        console.log(
            "sending user input1"
        )
        if (input.trim() === "") return;
        console.log(
            "sending user input"
        )

        // Append user message to message history
        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Send message to Langchain AI
        if (conversation) {
            const aiResponse = await sendMessage(conversation, input); // Use conversation instance
            const aiMessage = { sender: "ai", text: aiResponse };
            console.log(aiResponse);

            // Append AI message to message history
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }

        setInput(""); // Clear the input field after sending
    };
    useEffect(() => {
        console.log('Message component updated');
        console.log(messages)
    }, [messages]); // Re-run effect when 'message' prop changes
    // Initialize the Langchain chat
    useEffect(() => {
        const initChat = async () => {
            const conv = await initializeChat(OPENAI_API_KEY);
            setConversation(conv);
        };

       
        // getAllTrans(20, customerId, APP_KEY, token)
        //     .then((res) => {
        //         setInput(res);
        //         console.log(res);
        //     })
        //     .catch((e) => {
        //         alert(e);
        //     });

        //opening banking api is super stingy and don't allow us to  corse access
        let res = `{
  found: 6218,
  displaying: 20,
  moreAvailable: 'true',
  fromDate: '1000000000',
  toDate: '1729374515',
  sort: 'desc',
  transactions: [
    {
      id: 28808467738,
      amount: -505.43,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'pos deb  //  i',
      memo: 'pos deb  //  in care tech mechanical in care tech mech austin tx c#',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808467691,
      amount: 2898.63,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808467649,
      amount: 621.85,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'th       grubhub, inc. c g ve',
      memo: 'th grubhub, inc. c quantarus capital lp st-lyohql',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808467018,
      amount: -12361.71,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'tfr from **** to **** pa',
      memo: 'tfr from **** to **** payroll reimbursement oct th',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808466972,
      amount: 734.31,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'dda deposit',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808466933,
      amount: 382.44,
      accountId: 7059351185,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens  ol',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383459,
      categorization: [Object]
    },
    {
      id: 28808466519,
      amount: 12.24,
      accountId: 7059351191,
      customerId: 7033717872,
      status: 'active',
      description: 'interest paid',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383457,
      categorization: [Object]
    },
    {
      id: 28808466485,
      amount: -61.83,
      accountId: 7059351191,
      customerId: 7033717872,
      status: 'active',
      description: 'cable pmnt optimum  ppd',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383457,
      categorization: [Object]
    },
    {
      id: 28808466223,
      amount: 282.99,
      accountId: 7059351190,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens  ol',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383457,
      categorization: [Object]
    },
    {
      id: 28808465573,
      amount: 258.34,
      accountId: 7059351190,
      customerId: 7033717872,
      status: 'active',
      description: 'unive grubhub, inc. c g ve',
      memo: 'unive grubhub, inc. c quantarus capital lp st-fckrwd',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383456,
      categorization: [Object]
    },
    {
      id: 28808465543,
      amount: -10271.77,
      accountId: 7059351190,
      customerId: 7033717872,
      status: 'active',
      description: 'tfr from **** to **** pa',
      memo: 'tfr from **** to **** payroll reimbursement oct th',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383456,
      categorization: [Object]
    },
    {
      id: 28808465497,
      amount: 3623.69,
      accountId: 7059351190,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383456,
      categorization: [Object]
    },
    {
      id: 28808464927,
      amount: -404,
      accountId: 7059351190,
      customerId: 7033717872,
      status: 'active',
      description: 'internet bill pay \\serialnum',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383456,
      categorization: [Object]
    },
    {
      id: 28808464564,
      amount: -525.49,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'cable pmnt optimum  ppd',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383455,
      categorization: [Object]
    },
    {
      id: 28808464512,
      amount: 2981.43,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383455,
      categorization: [Object]
    },
    {
      id: 28808463936,
      amount: -10651.8,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'tfr from **** to **** pa',
      memo: 'tfr from **** to **** payroll reimbursement oct th',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383454,
      categorization: [Object]
    },
    {
      id: 28808463888,
      amount: 324.49,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'th  grubhub, inc. <>',
      memo: 'th grubhub, inc. <> chickens llc st-ivieen',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383454,
      categorization: [Object]
    },
    {
      id: 28808463857,
      amount: -454.64,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'util pymt  consolidated edison sgl web',
      memo: 'util pymt consolidated edison sgl web  s',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383454,
      categorization: [Object]
    },
    {
      id: 28808462895,
      amount: 230.81,
      accountId: 7059351189,
      customerId: 7033717872,
      status: 'active',
      description: 'comb. dep. / merchant one sys <>',
      memo: 'comb. dep. / merchant one sys <> chickens  ol',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383454,
      categorization: [Object]
    },
    {
      id: 28808462747,
      amount: -61.83,
      accountId: 7059351188,
      customerId: 7033717872,
      status: 'active',
      description: 'cable pmnt optimum  ppd',
      postedDate: 1729339200,
      transactionDate: 1729339200,
      createdDate: 1729383453,
      categorization: [Object]
    }
  ]
}

        `

        initChat();
        setInput(res);
        // // Append user message to message history
        // const userMessage = { sender: "user", text: input };
        // setMessages((prevMessages) => [...prevMessages, userMessage]);

        // // Send message to Langchain AI
        // if (conversation) {
        //     sendMessage(conversation, res).then((res) => {console.log(res);setMessages((prevMessages) => [...prevMessages, { sender: "ai", text: res}]); setInput("")}) // Use conversation instance
        // }
    }, [APP_KEY]);



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
