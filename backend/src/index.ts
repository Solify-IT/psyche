import express from 'express';
import cors from 'cors';



const portNumber: number = 8000;
const app: express.Application = express();


const initServer = () => {
    app.use(express.json());
    app.use(cors());
}

app.listen(portNumber, async () => {
    console.log("Backend server running on port " 
    + portNumber)

    initServer();
});
