
// import { OpenAI } from '@langchain/openai';

// import { ConversationSummaryBufferMemory } from 'langchain/memory';
// import { LLMChain} from 'langchain/chains';
// import { PromptTemplate } from "@langchain/core/prompts";// Import SystemMessage


// export async function initializeChat(apiKey) {
//   // Create an instance of the OpenAI model (you'll need your API key here)
//   const model = new OpenAI({
//     openAIApiKey: apiKey, // Replace with your API key
//     temperature: 0.7,
//   });

//   // Set up memory with summarization to prevent memory from getting too large
//   const memory = new ConversationSummaryBufferMemory({
//     llm: model,
//     maxTokens: 1000, // You can configure how many tokens before it summarizes
//   });
//   const systemPrompt = PromptTemplate.fromTemplate("be a helpful asistant");


//    // Create a conversation chain with memory and the system prompt
//    const conversation = new LLMChain({
//     llm: model,
//     systemPrompt,
//     memory:memory // Include the system prompt
//   });


//   return conversation;
// }

// export async function sendMessage(message, conversation) {
//   const response = await conversation.call({ input: message });
//   console.log(response.output); // This will include the AI's response
//   return response.output; // You can render this in your chat UI
// }

// // // Usage example:
// // const conversation = await initializeChat();
// // sendMessage("Hello, who are you?", conversation);


import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { BufferMemory } from "langchain/memory";


 // Initialize the memory
 const memory = new BufferMemory({ memoryKey: "chat_history" });

// Initialize the language model
export async function initializeChat(apiKey) {
  const llm = new ChatOpenAI({ temperature: 0, openAIApiKey: apiKey });

  // Create the prompt template
  const template = `You are a financial consultant specializing in business solutions for companies looking to optimize their resource allocation based on transaction data. 
We provide services to businesses and have access to the transaction history from all their bank accounts. The goal is to analyze these transactions and devise a detailed resource allocation plan that enables them to improve efficiency and enhance business performance.
Instructions: 1. Analyze the transaction data to identify spending patterns and areas of inefficiency.
2. Provide insights into the following:
   - Major spending categories and their impacts on the business.
   - Suggestions for reducing unnecessary expenses.
   - Recommendations for reallocating resources to areas with the potential for higher returns.
3. Create a detailed plan that includes:
   - Proposed budget allocations for different categories.
   - Strategies for improving cash flow management.
   - Actionable steps for the business to take in the short and long term to enhance overall performance
Customer Context:
Francis runs a successful medium-sized local restaurant. The restaurant is turning a profit after all its expenses. The restaurant has multiple checking accounts needed to run the business with revenue from in-store sales as well as online services like DoorDash. Additionally, the restaurant has some loan accounts to cover purchases that Francis has made for new or replacement equipment.
Francis's transaction data:
   `;

  const prompt = PromptTemplate.fromTemplate(template);

  // // Initialize the memory
  // const memory = new BufferMemory({ memoryKey: "chat_history" });

  // Create the runnable sequence

  const chain = RunnableSequence.from([
    {
      question: (input) => input,
      chat_history: async () => {
        const memoryResult = await memory.loadMemoryVariables({});
        return memoryResult.chat_history || "";
      },
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);
  return chain;
}


// Function to run the chain and update memory
export async function sendMessage(chain,data) {
  const response = await chain.invoke({ data });
  await memory.saveContext({ input:data }, { ouput:response });
  return response;
}
