import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true},
    phone: String,
    summary: {
        totalEnergy: Number,
        totalLoad: Number,
        inverterSize: String,
        panelSize: Number,
        noOfPanels: Number,
    },
    status: {type: String, enum: ["pending", "referred"], default: "pending" },
    createdAt: {type: Date, default: Date.now}
})


export default mongoose.models.Recommendation || mongoose.model("Recommendation", RecommendationSchema);
