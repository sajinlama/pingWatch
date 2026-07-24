import { Redis } from "ioredis";


export const connection = new Redis("redis://localhost:6379");
