const SavedForm = require("../models/SavedForm"); // Sequelize or raw db connection

// Save or update a form
const saveForm = async (req, res) => {
  const { inquiryId, userId, businessName } = req.body;

  try {
    // Save or update form using inquiry ID as unique identifier
    const [form, created] = await SavedForm.upsert({
      inquiry_id: inquiryId,
      user_id: userId,
      business_name: businessName,
    });

    res.status(200).json({
      message: created
        ? "Form created successfully"
        : "Form updated successfully",
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Failed to save form" });
  }
};

// Get all saved forms for a user
const getSavedForms = async (req, res) => {
  const { userId } = req.params;

  try {
    const forms = await SavedForm.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(forms);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch saved forms" });
  }
};

// Delete a form by inquiry ID
const removeForm = async (req, res) => {
  const { inquiryId } = req.params;

  try {
    const deleted = await SavedForm.destroy({
      where: { inquiry_id: inquiryId },
    });

    if (deleted) {
      res.status(200).json({ message: "Form removed successfully" });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    console.error("Remove error:", error);
    res.status(500).json({ error: "Failed to remove form" });
  }
};

module.exports = {
  saveForm,
  getSavedForms,
  removeForm,
};
