let currentUnit = 'metric';

function switchUnit(unit) {
  currentUnit = unit;
  if (unit === 'metric') {
    document.getElementById('metricBtn').classList.add('active');
    document.getElementById('imperialBtn').classList.remove('active');
    document.getElementById('metricInputs').style.display = 'block';
    document.getElementById('imperialInputs').style.display = 'none';
  } else {
    document.getElementById('imperialBtn').classList.add('active');
    document.getElementById('metricBtn').classList.remove('active');
    document.getElementById('metricInputs').style.display = 'none';
    document.getElementById('imperialInputs').style.display = 'block';
  }
  calculateBMI();
}

function calculateBMI() {
  let bmi = 0;

  if (currentUnit === 'metric') {
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    const weightKg = parseFloat(document.getElementById('weightKg').value);

    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    const heightM = heightCm / 100;
    bmi = weightKg / (heightM * heightM);
  } else {
    const ft = parseFloat(document.getElementById('heightFt').value) || 0;
    const inches = parseFloat(document.getElementById('heightIn').value) || 0;
    const weightLbs = parseFloat(document.getElementById('weightLbs').value);

    const totalInches = (ft * 12) + inches;

    if (isNaN(weightLbs) || totalInches <= 0 || weightLbs <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    // Imperial Formula: (weight in lbs / (height in inches)^2) * 703
    bmi = (weightLbs / (totalInches * totalInches)) * 703;
  }

  const bmiFormatted = bmi.toFixed(1);
  document.getElementById('bmiResult').innerText = bmiFormatted;

  const statusElement = document.getElementById('bmiStatus');

  if (bmi < 18.5) {
    statusElement.innerText = "Underweight";
    statusElement.style.backgroundColor = "#ffecb3";
    statusElement.style.color = "#b78103";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    statusElement.innerText = "Normal Weight";
    statusElement.style.backgroundColor = "#c8e6c9";
    statusElement.style.color = "#2e7d32";
  } else if (bmi >= 25 && bmi <= 29.9) {
    statusElement.innerText = "Overweight";
    statusElement.style.backgroundColor = "#ffe0b2";
    statusElement.style.color = "#e65100";
  } else {
    statusElement.innerText = "Obese";
    statusElement.style.backgroundColor = "#ffcdd2";
    statusElement.style.color = "#c62828";
  }
}

// Initial calculation
calculateBMI();
