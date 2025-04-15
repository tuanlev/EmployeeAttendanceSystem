import { Response } from "express";
import jwt from "jsonwebtoken"
import { APIResponse } from "./apiReponse";
import { User, UserI } from "../models/userModel";
import { create } from "domain";
const FRESHTOKEN_EXPIRESIN = '20m'
const ACCESSTOKEN_EXPIRESIN = '20d'

export const createFreshToken =  (data:User) : string => {
    let token = jwt.sign({data},process.env.JWT_SECRET,{
        expiresIn : FRESHTOKEN_EXPIRESIN,

    })
    return token;
}
export const createAccessToken =  (data:User) : string => {
    let token = jwt.sign({data},process.env.JWT_SECRET,{
        expiresIn : ACCESSTOKEN_EXPIRESIN,
    })
    return token;
}