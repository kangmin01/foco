import express from 'express';
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from './config';
import { postRouter,
} from './routers';
import { endPoint } from './constants';

const app = express();
//mongoose.connect(MONGODB_URI);
mongoose.set("strictQuery", true).connect(MONGODB_URI);
mongoose.connection.on('connected', ()=> {
  console.log(`Successfully connected to MongoDB: ${MONGODB_URI}`);
})

app.use(express.json());
app.use(endPoint.post, postRouter);

app.listen(PORT, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
});