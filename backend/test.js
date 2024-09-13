const OpenAI = require('openai');
require('dotenv').config(); // To load environment variables

const openai = new OpenAI({
    apiKey: process.env.KEY1, // Ensure you have an environment variable set up for the API key
});

(async () => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4", // Correct model name, "gpt-4o-mini" is not valid
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Write a haiku about recursion in programming.",
                },
            ],
        });

        console.log(completion.choices[0].message.content); // Correctly access the message content
    } catch (error) {
        console.error('Error creating completion:', error);
    }
})();
