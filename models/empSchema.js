const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phoneNumber: {
        type: String,
        required: false,
    },
      employeeId: {
      type: String,
      required: false,  
    },
    name: {
      type: String,
      required: false,
    },
    department:{
        type:String,
        required:false,
    },
  
    email:{
        type:String,
        required:false,
    },
    gender: {
      type: String,
      required: false,
    },
 
    education: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    bloodGroup: {
      type: String,
      required: false,
    },
    profileURL: {
      type: String,
      required: false, 
    },
    documents:{
        type:String,
        required:false,
    },
    // isAdminApproved: {
    //   type: Boolean,
    //   default: false,
    // },
     isHRApproved: {
      type: Boolean,
      default: false,
    },
      isAssetApproved: {
      type: Boolean,
      default: false,
    },
      isIDCardApproved: {
      type: Boolean,
      default: false,
    },
    idCardSubmitted: {
      type: Boolean,
      default:false,
    },
    assetName: {
      type: String,
      enum: ["Dell", "Lenovo", "Mac", "Others"],
      required: false,
    },
    assetType: {
      type: String,
      enum: ["i7", "i10"],
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    assetId:{
      type:String,
      required:false
    },
    assetSubmitted: {
      type:String,
      required:false
    },
    isWithCharger:{
      type:Boolean,
      required:false
    },
    isWithMouse:{
      type:Boolean,
      required:false
    },
    assetApprovalDate:{
      type:Date,
  },
  approvedBy: {
    type: [{
      type:String,
      enum:['HR','Assistant HR']
    }],
    },
  idApprovedBy: {
    type: [{
      type:String,
      enum:['Team Head','Team Lead']
    }]
  },
  assetApprovedBy:{
    type:[{
      type:String,
      enum:['Product Manager','Asset Manager']
    }]
  }

  },
    { timestamps: true }
);
module.exports = mongoose.model("userSchema",userSchema)