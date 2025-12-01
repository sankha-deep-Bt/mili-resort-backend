import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

interface IAdmin extends Document {
  email: string;
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
  changePassword(newPassword: string): Promise<void>;
  omitPassword(): Omit<IAdmin, "password">;
}

export const AdminSchema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password);
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return compareValue(candidatePassword, this.password);
};

// Method to omit password
AdminSchema.methods.omitPassword = function () {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
};

AdminSchema.methods.changePassword = async function (newPassword: string) {
  this.password = newPassword;
  await this.save();
};

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
