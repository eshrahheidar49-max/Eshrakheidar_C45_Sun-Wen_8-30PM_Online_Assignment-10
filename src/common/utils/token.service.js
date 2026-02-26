import Jwt from "jsonwebtoken"


export const GenerateToken =({payload,secret_key,options={}}={})=>{
    return Jwt.sign(payload,secret_key,options)
}
export const VerifyToken =({token,secret_key,options={}}={})=>{
    return Jwt.verify(token,secret_key,options)
}