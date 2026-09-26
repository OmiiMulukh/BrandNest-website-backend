import FAQ from "../models/FAQ.js";

// Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required"
      });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category
    });

    res.status(201).json({
      message: "FAQ created successfully",
      faq
    });
  } catch (error) {
    console.error("Create FAQ error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get all FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      count: faqs.length,
      faqs
    });
  } catch (error) {
    console.error("Get FAQs error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found"
      });
    }

    res.status(200).json({
      message: "FAQ updated successfully",
      faq
    });
  } catch (error) {
    console.error("Update FAQ error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found"
      });
    }

    res.status(200).json({
      message: "FAQ deleted successfully"
    });
  } catch (error) {
    console.error("Delete FAQ error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};