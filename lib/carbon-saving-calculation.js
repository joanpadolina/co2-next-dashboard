export function carbonSavingCalculation(duration, user) {
  if(duration) {
    const splitDuration = duration.split(":");
    const carbonIntensity = 408;
    const carbonSavingInPercentage = 14;
    const elektricityConsumed = user.elektricityConsumed;
    const chargeDuration =
      splitDuration[0] + "." + Math.floor((splitDuration[1] / 60) * 100);
    const savingCarbon = (carbonIntensity * carbonSavingInPercentage) / 100;
    const savingInHour = savingCarbon * elektricityConsumed;
    const totalCarbonSaving = Math.floor(savingInHour * Number(chargeDuration));

    return totalCarbonSaving;
  } else {
    console.error(err);
  }
}

export function carbonReducer(userCarbon) {
  const chargeCarbonTotal = userCarbon.reduce(
    (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
    0
  );
  return chargeCarbonTotal
}