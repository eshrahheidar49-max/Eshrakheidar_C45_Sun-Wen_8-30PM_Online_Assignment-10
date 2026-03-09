import { compareSync, hashSync } from "bcrypt";

export function Hash({plain_text,salt_rounds}={}){
    return hashSync(plain_text,salt_rounds)
}
export function compare({plain_text,cipher_text}={}){
    return compareSync(plain_text,cipher_text)
}