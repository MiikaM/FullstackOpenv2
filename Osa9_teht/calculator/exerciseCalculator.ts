interface Exercises {
  target: number,
  exerciseDays: Array<number>
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgs = (args: Array<string>): Exercises => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error('Provided target value was not a number');
  const arrayNum = [];

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      arrayNum.push(Number(args[i]));
    } else throw new Error(`Provided value: '${args[i]}', was not a number`);
  }

  console.log({ arrayNum });

  return {
    target: Number(args[2]),
    exerciseDays: arrayNum
  };
};

export const exerciseCalc = (hours: Array<number>, target: number): Result => {
  let trainingDays = 0;

  hours.forEach(day => {
    if (day > 0) trainingDays++;
  });

  const total = hours.reduce((a, b) => {
    return a + b;
  });

  const average = total / hours.length;
  let rating = average / target;
  let ratingDescription = '';

  if (rating < 0.75) {
    rating = 1;
    ratingDescription = 'You can do better!';
  } else if (rating < 1) {
    rating = 2;
    ratingDescription = 'Nice job just a little harder next time!';
  } else if (rating > 1) {
    rating = 3;
    ratingDescription = 'Good job, you achieved your target, keep up the good work!';
  }

  const success = (average > target);

  const exersiceAnalysis = {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };

  return exersiceAnalysis;
};

try {
  const { target, exerciseDays } = parseArgs(process.argv);
  console.log(exerciseCalc(exerciseDays, target));
} catch (e) {
  console.log('Error: ', e.message as string);
}