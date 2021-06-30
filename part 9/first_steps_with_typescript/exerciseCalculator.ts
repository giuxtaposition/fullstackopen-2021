interface exerciseCalculator {
  target: number
  exerciseHours: Array<number>
}

const parseArgumentsExerciseCalculator = (
  args: Array<string>
): exerciseCalculator => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.forEach(arg => {
    if (isNaN(parseInt(arg))) {
      throw new Error('Provided values were not numbers!');
    }
  });

  const exerciseHours: Array<number> = args.slice(1).map(argv => parseInt(argv));

  return {
    target: Number(args[0]),
    exerciseHours: exerciseHours,
  };
};

export const calculateExercises = (target: number, exerciseHours: Array<number>) => {
  const periodLength = exerciseHours.length;
  let trainingDays = 0;
  let totalHours = 0;
  let success = false;
  let rating = 1;
  let ratingDescription = "You  didn't work very hard, please do better";

  exerciseHours.forEach(day => {
    if (day !== 0) {
      trainingDays = trainingDays + 1;
      totalHours = totalHours + day;
    }
  });

  const average = totalHours / periodLength;

  //rating
  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'Congrats! You reached your goal';
  } else if ((average / target) * 100 > 49) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exerciseHours } = parseArgumentsExerciseCalculator(
    process.argv.slice(2)
  );
  console.log(calculateExercises(target, exerciseHours));
} catch (e) {
  console.log('Error, something bad happened, message: ', (e as Error).message);
}
