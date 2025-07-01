const cron = require("node-cron");
const Sequelize = require("sequelize");
const SavedForm = require("./models/SavedForm"); // Adjust path as needed

function cleanupOldSavedForms() {
  // Run every 10 seconds
  cron.schedule("0 2 * * *", async () => {
    try {
      //const twoHoursAgo = new Date(Date.now() - 2 * 60 * 1000); // 🔥 2 minutes ago
      const eightMonthsAgo = new Date();
      eightMonthsAgo.setMonth(eightMonthsAgo.getMonth() - 8);
      // const oneYearAgo = new Date();
      // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const deletedCount = await SavedForm.destroy({
        where: {
          created_at: {
            [Sequelize.Op.lt]: eightMonthsAgo,
          },
        },
      });

      console.log(
        `[CRON] ✅ [${new Date().toLocaleTimeString()}] Deleted ${deletedCount} saved forms older than 2 hours`
      );
    } catch (err) {
      console.error("[CRON] ❌ Cleanup error:", err);
    }
  });
}

module.exports = cleanupOldSavedForms;
