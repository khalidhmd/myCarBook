export default function(car) {
  const expireyDate = new Date(car.lExpiry);
  const today = new Date();
  const diffTime = Math.abs(expireyDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays < 30;
}
