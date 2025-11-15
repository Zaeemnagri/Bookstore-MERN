const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path if necessary

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const adminEmail = "admin@bookstore.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        name: "Admin",
        email: adminEmail,
        passwordHash: hashedPassword, // your schema expects this field
        role: "admin",
      });

      console.log("✅ Admin user created successfully!");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error creating admin user:", err);
  });
