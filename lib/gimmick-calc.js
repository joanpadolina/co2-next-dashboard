const gimmick = (carbon) => {
  const math = (data) => Math.floor((carbon * 100) / data);

  return {
    plane: math(195),
    car: math(121),
    train: math(30),
  };
};

function diagram(carbon) {
  const data = gimmick(carbon);
  const average = [data.plane, data.car, data.train];
  const reduce = average.reduce((a, b) => a + b);
  for (let i = 0; i <= average.length; i++) {
    const barWidth = Math.ceil((average[i] / reduce) * 100);
    return barWidth;
  }
}

async function distance() {
  const url = await fetch('http://localhost:4000/gimmick');
  const response = await url.json();
  const petrol = await response.gimmick.petrolCar;
  return petrol;
}

export async function calcCarbonToKm(carbon) {
  const averagePetrol = await distance();
  const resultDistance = (carbon * 100) / averagePetrol;
  return Math.ceil(resultDistance);
}
