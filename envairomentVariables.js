import dotenv from 'dotenv';

dotenv.config({path: './.env'});

export const dbpass = process.env.DB_PASS;
export const port = process.env.PORT || 4001;
export const signature = process.env.SIGNATURE;