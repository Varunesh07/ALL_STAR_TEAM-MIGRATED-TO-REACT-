export function getInitials(sentence) {
  return sentence
    .split(' ')
    .filter((word) => word.trim() !== '') // remove extra spaces
    .map((word) => word[0].toUpperCase()) // take first letter
    .join('')
}
