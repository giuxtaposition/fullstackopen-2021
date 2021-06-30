import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({
            error: 'Malformatted parameters, should be numbers',
        });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    res.json({
        height: Number(height),
        weight: Number(weight),
        bmi: bmi,
    });
});

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        res.status(400).json({
            error: 'Missing parameters',
        });
    }

    //check if target is number
    if (isNaN(Number(target))) {
        res.status(400).json({
            error: 'Malformatted parameters, should be numbers',
        });
    }

    //check if exerciseHours is number
    daily_exercises.forEach((hours: string) => {
        if (isNaN(parseInt(hours))) {
            res.status(400).json({
                error: 'Malformatted parameters, should be numbers',
            });
        }
    });

    const exerciseHours = daily_exercises.map((hours: string) => parseInt(hours));

    const result = (calculateExercises((Number(target)), exerciseHours));
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
