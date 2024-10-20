import OpenAI from "openai";

export async function getclient(apiKey){
    return await new OpenAI({apiKey:apiKey,dangerouslyAllowBrowser: true});
}
export async function getAIResponse(openai, data){
const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: `You are a financial consultant specializing in business solutions for companies looking to optimize their resource allocation based on transaction data. 
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
Francis's transaction data:` },
        {
            role: "user",
            content: data,
        },
    ],
});

console.log(response.choices[0].message);

return response.choices[0].message;

}