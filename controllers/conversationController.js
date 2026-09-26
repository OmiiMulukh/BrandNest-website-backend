import Conversation from "../models/Conversation.js";
import { sendEmail } from "../services/emailService.js";

// Create new conversation
export const createConversation = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required"
      });
    }

    const conversation = await Conversation.create({
      name,
      email,
      subject,
      messages: [
        {
          sender: "client",
          message
        }
      ]
    });

    // Send notification email to BrandNest admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New BrandNest Inquiry: ${subject}`,
      text: `
New conversation received.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <h2>New BrandNest Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <h3>Message</h3>
        <p>${message}</p>
      `
    });

    res.status(201).json({
      message: "Conversation created successfully",
      conversation
    });

  } catch (error) {
    console.error("Create conversation error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get all conversations - Admin
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 });

    res.status(200).json({
      count: conversations.length,
      conversations
    });

  } catch (error) {
    console.error("Get conversations error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get single conversation - Admin
export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found"
      });
    }

    res.status(200).json({
      conversation
    });

  } catch (error) {
    console.error("Get conversation error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Change conversation status
export const updateConversationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["open", "closed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be open or closed"
      });
    }

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found"
      });
    }

    res.status(200).json({
      message: "Conversation status updated",
      conversation
    });

  } catch (error) {
    console.error("Update status error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};