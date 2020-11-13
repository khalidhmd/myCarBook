export default function(maintenances, car) {
  let n = 0;
  for (id in maintenances) {
    if (
      maintenances[id].kmRate > 0 &&
      maintenances[id].kmRate + maintenances[id].km <= car.km
    ) {
      n += 1;
      continue;
    }

    const maintenanceDate = new Date(maintenances[id].date);

    const today = new Date();

    const diffTime = Math.abs(today - maintenanceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > maintenances[id].timeRate * 30) n += 1;
  }
  return n;
}
