const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name...']
    },
    
    price:{
        type: Number,
        required: [true, 'Please enter Price....']
    },

    featured: {
        type: Boolean,
        default: false
    },

    
    rating: {
        type: Number,
        default: 4.5
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not from company'
        }
    },
})

module.exports = mongoose.model('Product', productSchema)