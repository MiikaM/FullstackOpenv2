interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number, 
  ratingDescription: string,
  target: number,
  average: number
}
const exerciseCalc = (hours: Array<number>, target: number): Result => {
  let trainingDays = 0;

  hours.forEach(day => {
    if(day > 0) trainingDays++;
  });

  let total = hours.reduce((a,b) => {
    return a+b;
  }) 

  let average = total/hours.length;

  let rating = average/target;
  let ratingDescription = '';

  if (rating < 0.75 ) { 
    rating = 1;
    ratingDescription = 'You can do better!';
  } else if (rating < 1) {
    rating = 2;
    ratingDescription = 'Nice job just a little harder next time!';
  } else if (rating > 1) {
    rating = 3;
    ratingDescription = 'Good job, you achieved your targe, keep up the good work!';
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
  }

 return exersiceAnalysis
}

try {
  console.log(exerciseCalc([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (e) {
  console.log('Error: ', e.message)
}