import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(`mongodb+srv://muhabdulazis:${process.env.SECRET_PASSWORD}@cluster0.lvj3gs7.mongodb.net/manote`);
