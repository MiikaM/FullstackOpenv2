const calculateBmi = (a: number, b: number): string => {
  const bmi = (b / ((a/100) ** 2))
  console.log({bmi})
  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else if (bmi > 40) {
    return "Obese Class III (Very severely obese)	";
  }

  return "Something was wrong withh input";
}

try {
  console.log(calculateBmi(180, 74));
} catch(e) {
  console.log('Error: ', e.message);
}