import express, {Request, Response, NextFunction} from "express"
import "express-async-errors";
import {router} from './routes';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import path from "path";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("v1" ,router);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: "Internal Server Error",
    });
});

app.get('/terms', (req: Request, res: Response) => {
    return res.json({
        message: "Termos de serviço"
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});