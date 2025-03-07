import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    sucscriber: {
      type: mongoose.Schema.Types.ObjectId, // one who is subsrcing
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
