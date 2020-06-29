import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalc } from './exerciseCalculator'
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  console.log({ height, weight })

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    const err = new Error('malformatted parameters')
    console.log({ err })
    res.json({ error: err.message });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  const response = {
    weight: weight,
    height: height,
    bmi: bmi
  }

  res.json(response);
});

app.post('/exercises', (req, res) => {
  let dailyExercise = req.body.daily_exercises
  console.log({ dailyExercise })

  const target = req.body.target

  if (!target || !dailyExercise || dailyExercise.length < 1) {
    return res.status(400).json({ error: 'Parameters missing!' })
  }

  if (isNaN(Number(target))|| dailyExercise.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const response = exerciseCalc(dailyExercise, target)

  return res.json(response)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});