import mongoose from "mongoose";
/* PetSchema will correspond to a collection in your MongoDB database. */

const ProductSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceSale: {
    type: Number,
    required: true,
  },
  totalRating: {
    type: Number,
    required: true,
  },
  totalReview: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
  },
  inventoryType: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  available: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  sold: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  images: {
    type: Array,
  },
  tags: {
    type: Array,
  },
  colors: {
    type: Array,
  },
  sizes: {
    type: Array,
  },
  condition: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  operatingSystem: {
    type: String,
    required: false
  },
  osArchitecture: {
    type: String,
    required: false
  },
  ramType: {
    type: String,
    required: false
  },
  ramCapacity: {
    type: String,
    required: false
  },
  storageType: {
    type: String
  },
  storageCapacity: {
    type: String,
    required: false
  },
  processor: {
    type: String,
    required: false
  },
  processorBrand: {
    type: String,
    required: false
  },
  processorGeneration: {
    type: String,
    required: false
  },
  clockSpeed: {
    type: String,
    required: false,
  },
  ramFrequency: {
    type: String,
    required: false,
  },
  cacheMemory: {
    type: Number,
    required: false
  },
  graphicsProcessor: {
    type: String
  },
  numberOfCores: {
    type: Number
  },
  usbPorts: {
    type: String,
    required: false
  },
  hdmiPorts: {
    type: String,
    required: false
  },
  micIn: {
    type: Boolean,
    required: false
  },
  ethernetPort: {
    type: Boolean,
    required: false
  },
  typeCPort: {
    type: String,
    required: false
  },
  touchScreen: {
    type: Boolean,
    required: false
  },
  screenSize: {
    type: String,
    required: false
  },
  screenResolution: {
    type: String,
    required: false
  },
  screenType: {
    type: String,
    required: false
  },
  speakers: {
    type: String,
    required: false
  },
  internalMic: {
    type: String,
    required: false
  },
  soundProperties: {
    type: String,
    required: false
  },
  wirelessLan: {
    type: String,
    required: false
  },
  bluetooth: {
    type: String,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  dimensions: {
    type: String,
    required: false
  },
  salesPackage: {
    type: String,
    required: true
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
