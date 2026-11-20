const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, unique:true, lowercase: true, match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email']},
    password:{type:String, required:[true, 'Password required'], select:false},
    role:{type:String, enum:['student', 'admin'], default:'student'},

}, {timestamps: true})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
});

userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)