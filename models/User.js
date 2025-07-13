const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const socialLinksSchema = new mongoose.Schema({
  linkedin: String,
  github: String,
  leetcode: String,
  geeksforgeeks: String,
  hackerrank: String,
  codeforces: String,
  codechef: String,
  twitter: String,
  instagram: String,
  website: String,
  portfolio: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  grade: String,
  description: String,
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company: String,
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
  technologies: [String],
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  issueDate: Date,
  certificateLink: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String },  // optional

  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true  // keep required for auth to work
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  bio: String,
  profileImage: String,
  coverImage: String,
  location: String,
  phone: String,

  socialLinks: socialLinksSchema,

  virtualResume: {
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    skills: [String],
    resumeLink: String
  },

  isVerified: { type: Boolean, default: false },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  lastLogin: Date,
  shareSettings: {
    isPublic: { type: Boolean, default: true },
    customUrl: { type: String, unique: true, sparse: true },
    lastSharedAt: Date
  }

}, { timestamps: true });

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password matching
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
