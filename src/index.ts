import express, { Request, Response } from "express"

const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' });
});

app.post('/score', (req: Request, res: Response) => {

    return res.json();
});

app.get('/scores/:page', (req: Request, res: Response) => {
    return res.json({ pageNumber: req.params.page, scores: []});
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});