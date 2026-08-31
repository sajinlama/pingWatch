import { rateLimit } from 'express-rate-limit'

export const globalLimiter = rateLimit({
    windowMs:1 *60*1000,
    limit:10,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    ipv6Subnet:56

})

export const authLimiter = rateLimit({
    windowMs:1*60*1000,
    limit:5,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    ipv6Subnet:56

})