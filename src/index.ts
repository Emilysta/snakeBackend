import express, { Request, Response } from "express";
import * as db from './playerScoreModel';
import { body, validationResult, param } from 'express-validator';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' });
});

type PlayerScore = {
    playerName: string,
    playerScore: number
}

app.post('/score',
    body('playerName').notEmpty(), body('playerName').isLength({ min: 1, max: 150 }),
    body('playerScore').isInt({ min: 0 }),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const playerScore = req.body as PlayerScore;

        const addedPlayerScore = await db.addPlayerScore(playerScore.playerName, playerScore.playerScore);
        return res.json(addedPlayerScore);
    });

app.get('/scores/:page',
    param('page').isInt({ min: 1 }),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const pageNumber = parseInt(req.params.page);
        const pageContent = await db.getPlayerScores(pageNumber);
        const count = await db.getPagesCount();
        return res.json({ pageNumber: pageNumber, scores: pageContent, pagesCount: count });
    });

app.listen(8100, () => {
    console.log(`Example app listening on port 8100`)
});