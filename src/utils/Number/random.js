export default function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
