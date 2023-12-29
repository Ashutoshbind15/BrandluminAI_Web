import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    accountId: String,
    accessToken: String,
    refreshToken: String,
    provider: String,
    userId: { type: String, required: "Pass in the userId" },
  },
  {
    _id: false,
  }
);

const Account = mongoose.models.User || mongoose.model("Account", AccountSchema);

export default Account;
