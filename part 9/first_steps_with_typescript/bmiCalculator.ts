interface bmiValues {
  height: number
  weight: number
}

const parseBmiArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const heightInSquareMeters = heightInMeters * heightInMeters;
  const bmi = weight / heightInSquareMeters;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else if (bmi >= 30 && bmi <= 34.9) {
    return 'Obese';
  } else if (bmi >= 35 && bmi <= 29.9) {
    return 'Severely Obese';
  } else if (bmi >= 40) {
    return 'Morbidly Obese';
  } else {
    return 'Something went wrong';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', (e as Error).message);
}
