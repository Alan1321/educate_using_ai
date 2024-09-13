const { Configuration, OpenAIApi } = require('openai');
const promptData = require('../models/prompt.json'); // Assuming the file path is correct
const pdf = require('pdfkit'); // Or any other PDF library of your choice
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config(); // To load environment variables

const openai = new OpenAI({
    apiKey: process.env.KEY1, // Ensure you have an environment variable set up for the API key
});

const savePdf = (filename, content) => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '../models/pdfs/', filename);
        const doc = new pdf();

        doc.pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                console.log(`PDF saved successfully at ${filePath}`);
                resolve(filePath);
            })
            .on('error', (err) => {
                console.error(`Error writing PDF to ${filePath}:`, err);
                reject('Error saving PDF: ' + err);
            });

        doc.text(content);
        doc.end();
    });
};


exports.gptResponse = async (req, res) => {
    console.log("Request Query:", req.query);
    try {
        // Extract and log query parameters
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

        if (!name || !school || !email) {
            throw new Error('Required parameters are missing');
        }

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

        console.log("Sending API call to GPT");
        const fullPrompt = `${promptData[0].prompt1} ${userData} ${promptData[0].prompt3}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: fullPrompt },
            ],
        });
        console.log("Completion received!");

        // Save the generated PDF
        const pdfContent = completion.choices[0].message.content;
        const pdfFilename = `${name.replace(/\s+/g, '')}.pdf`;
        await savePdf(pdfFilename, pdfContent);

        console.log("pdf save complete")
        // Send success response
        res.status(200).json({ message: 'PDF generated and saved successfully!' });

    } catch (error) {
        console.error('Error generating GPT response:', error);
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};

