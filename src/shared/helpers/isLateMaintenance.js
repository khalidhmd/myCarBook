export default function(maintenance, car) {
  if (
    maintenance.kmRate > 0 &&
    maintenance.kmRate + maintenance.km <= car.km + 200
  )
    return true;
  const maintenanceDate = new Date(maintenance.date);
  const today = new Date();
  const diffTime = Math.abs(today - maintenanceDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (maintenance.timeRate > 0 && diffDays + 7 > maintenance.timeRate * 30)
    return true;

  return false;
}
