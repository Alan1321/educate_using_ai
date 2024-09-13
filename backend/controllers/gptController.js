const { Configuration, OpenAIApi } = require('openai');
const promptData = require('../models/prompt.json'); // Assuming the file path is correct
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config(); // To load environment variables

const openai = new OpenAI({
    apiKey: process.env.KEY1, // Ensure you have an environment variable set up for the API key
});

const updateStudentRecords = (newRecord) => {
    // Define the path to your JSON file
    const filePath = path.resolve(__dirname, '../../frontend/src/data/studentRecords.json');

    // Read the existing data from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let records;
        try {
            // Parse the existing data
            records = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
            return;
        }

        // Append the new record
        records.push(newRecord);

        // Convert the updated data back to JSON format
        const updatedData = JSON.stringify(records, null, 2);

        // Write the updated data to the file
        fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to the file:', writeErr);
                return;
            }
            console.log('Student record updated successfully!');
        });
    });
};

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

        updateStudentRecords(req.query)

        console.log("sending api call to GPT")
        // Combine prompt1, user_data (prompt2), and prompt3 from prompt.json
        const fullPrompt = `${promptData[0].prompt1} ${userData} ${promptData[0].prompt3}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4", // Correct model name, "gpt-4o-mini" is not valid
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: fullPrompt,
                },
            ],
        });
        console.log("complete!")
        // Send the GPT response back to the user
        res.json({
            message: "ISELP Generated",
            prompt:fullPrompt,
            gpt_response: completion.choices[0].message.content // Extracting the GPT response text
        });

    } catch (error) {
        console.error('Error generating GPT response:', error);
        res.status(500).json({ error: "Failed to generate GPT response" });
    }
};
