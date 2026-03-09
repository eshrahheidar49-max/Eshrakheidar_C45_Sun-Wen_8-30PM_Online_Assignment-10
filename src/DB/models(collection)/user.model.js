import mongoose from "mongoose";
import { GenderEnum, providerEnum, RoleEnum } from "../../common/Enum/user.enum.js";
import { type } from "node:os";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 10,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 10,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider == providerEnum.google ? false : true;
      },
      trim: true,
      minlength: 6,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      //lowercase: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      default: GenderEnum.male,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
      //string => link of picture
    },
    confirmed: Boolean,
    provider: {
      type: String,
      enum: Object.values(providerEnum),
      default: providerEnum.system,
    },
     role: {
      type: String,
      enum: Object.values(RoleEnum),
      default:RoleEnum.user,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema
  .virtual("userName")

  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (v) {
    this.firstName = v.split(" ")[0]; // باخد من v واقسمها علي خسب المسافة هيطلعلي اراي باخد اول واحد فيها [0]
    this.lastName = v.split(" ")[1];
  });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
