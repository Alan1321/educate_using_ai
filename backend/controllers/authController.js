const fs = require('fs');
const bcrypt = require('bcryptjs');
const { sendInvitationEmail } = require('../services/emailService');
const { generateInviteToken, verifyInviteToken } = require('../utils/tokenUtil');
const { readDataFromFile, writeDataToFile } = require('../utils/fileUtil');

// Send invite
exports.sendInvite = async (req, res) => {
    const { email } = req.body;

    try {
        const token = generateInviteToken(email);

        // Read existing data
        const data = readDataFromFile();

        // Check if an invite for the email already exists
        const existingInvite = data.invites.find(invite => invite.email === email);
        if (existingInvite) {
            return res.status(400).json({ message: 'Invitation already sent' });
        }

        // Add invite to the "database"
        const newInvite = { email, token };
        data.invites.push(newInvite);
        writeDataToFile(data);

        // Send the invitation email
        await sendInvitationEmail(email, token);
        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send invitation' });
    }
};

// Sign up with invite
exports.signupWithInvite = async (req, res) => {
    const { token, email, password } = req.body;

    try {
        const validToken = verifyInviteToken(token);
        if (!validToken) return res.status(400).json({ message: 'Invalid token' });

        // Read existing data
        const data = readDataFromFile();

        // Find the invite
        const invite = data.invites.find(inv => inv.token === token);
        if (!invite || invite.email !== email) {
            return res.status(400).json({ message: 'Invalid invitation' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { email, password: hashedPassword };

        // Add user to the "database"
        data.users.push(newUser);

        // Remove the used invite
        data.invites = data.invites.filter(inv => inv.token !== token);
        writeDataToFile(data);

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sign up' });
    }
};
