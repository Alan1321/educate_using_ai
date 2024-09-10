exports.gptResponse = async (req, res) => {
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

    // Example response with the received data
    res.json({
        message: "Hello from GPT!",
        data: {
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
        }
    });
};
