import OpenAI from "openai";
const openai = new OpenAI();

export async function getAIResponse(data){
const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant" },
        {
            role: "user",
            content: data,
        },
    ],
});

console.log(response.choices[0].message);

return response.choices[0].message;

}