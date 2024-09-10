const axios = require('axios');
const promptData = require('../models/prompt.json'); // Assuming the file path is correct

exports.gptResponse = async (req, res) => {
    try {
        // Access the query parameters from the URL
        const {
            timestamp,
            name,
            school,
            email,
            hobbies,
            favorite_subjects,
            goals,
            school_impact,
            school_experience,
            desired_changes,
            conflict_triggers,
            feelings_about_conflicts,
            grade_level
        } = req.query;

        // Create user data as string (for prompt2)
        const userData = `
        Timestamp: ${timestamp}
        Name: ${name}
        School: ${school}
        Email: ${email}
        Hobbies: ${hobbies}
        Favorite Subjects: ${favorite_subjects}
        Goals: ${goals}
        School Impact: ${school_impact}
        School Experience: ${school_experience}
        Desired Changes: ${desired_changes}
        Conflict Triggers: ${conflict_triggers}
        Feelings About Conflicts: ${feelings_about_conflicts}
        Grade Level: ${grade_level}
        `;

        // Combine prompt1, user_data (prompt2), and prompt3 from prompt.json
        const fullPrompt = `${promptData[0].prompt1} ${userData} ${promptData[0].prompt3}`;

        // GPT API request (example using OpenAI API)
        const gptResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo",  // Update this to the correct model
            prompt: fullPrompt,
            max_tokens: 500,  // Adjust as per your requirements
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,  // Replace with your actual GPT API key
                'Content-Type': 'application/json'
            }
        });

        // Send the GPT response back to the user
        res.json({
            message: "ISELP Generated",
            gpt_response: gptResponse.data.choices[0].text.trim() // Extracting the GPT response text
        });

    } catch (error) {
        console.error('Error generating GPT response:', error);
        res.status(500).json({ error: "Failed to generate GPT response" });
    }
};
