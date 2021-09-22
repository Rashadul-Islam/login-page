const bcrypt = require("bcryptjs");


export const secure = async(pass)=>{
    const hashPass = await bcrypt.hash(pass,5);
    return hashPass;
}

export const passMatch = async(pass, hashPass)=>{
    const match = await bcrypt.compare(pass,hashPass);
    return match;
}