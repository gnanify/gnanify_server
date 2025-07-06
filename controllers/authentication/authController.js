const User = require("../../models/User");
const Otp = require("../../models/Otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    console.log("Login successful for:", email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Send OTP for password reset
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    const html = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #0A0A0A; color: #FAFAFA; max-width: 600px; margin: auto; padding: 32px; border-radius: 16px; border: 1px solid #1C1C1E;">
        <div style="text-align: center;">
          <h2 style="color: #FFD700; margin-bottom: 4px;">🔐 Gnanify Identity Verification</h2>
          <p style="font-size: 16px; margin-top: 10px;">Hey <strong style="color: #FDCB06;">${user.name}</strong>,</p>
        </div>
        <p style="font-size: 15px; line-height: 1.6; margin-top: 20px;">
          You're about to unlock your <strong>Gnanify Tech Identity</strong> — your personal hub of <span style="color: #FDCB06;">skills, GitHub, LeetCode, and AI work</span>.
        </p>
        <p style="font-size: 15px; margin-top: 20px;">Here's your <strong>One-Time Password</strong>:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #FFD700; color: #0A0A0A; font-size: 36px; font-weight: bold; padding: 16px 40px; border-radius: 12px; letter-spacing: 5px;">
            ${otpCode}
          </span>
        </div>
        <p style="font-size: 14px; color: #CCCCCC;">
          ⏱ OTP is valid for <strong>10 minutes</strong>. Don’t share it — this keeps your digital identity safe and secure.
        </p>
        <hr style="border: none; border-top: 1px solid #1C1C1E; margin: 40px 0;" />
        <div style="background-color: #1C1C1E; padding: 20px; border-radius: 12px;">
          <p style="font-size: 14px; color: #FFD700; font-weight: bold; text-align: center;">✨ What you can do with Gnanify:</p>
          <ul style="padding-left: 20px; color: #FAFAFA; line-height: 1.8; font-size: 14px;">
            <li>📈 Sync GitHub graphs & commits</li>
            <li>🏅 Show off your LeetCode ranks</li>
            <li>🧠 Add AI skills, projects & blogs</li>
            <li>🔗 Share your live resume as a public profile</li>
          </ul>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 32px; text-align: center;">
          If you didn’t request this OTP, no worries. Your account is safe. <br/>
          Need help? Contact <a href="mailto:support@gnanify.com" style="color: #FDCB06;">support@gnanify.com</a>
        </p>
        <p style="text-align: center; font-size: 12px; color: #444; margin-top: 32px;">
          © ${new Date().getFullYear()} <span style="color: #FFD700;">Gnanify.com</span> — Built for the Curious.
        </p>
      </div>
    `;

    await sendEmail(email, "Your OTP for Gnanify Password Reset", html);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Error sending OTP" });
  }
};

// Reset password with OTP
// Reset password with OTP
exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.status(400).json({ error: "All fields are required" });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (otpRecord.expiresAt < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Directly assign new password — pre('save') hook will hash it
    user.password = newPassword;
    await user.save();

    await Otp.deleteOne({ email });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Error:", err);
    res.status(500).json({ error: "Error resetting password" });
  }
};

// Get user by username (public or protected based on need)
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
