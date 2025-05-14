export async function loadWordList() {
  const response = await fetch(process.env.PUBLIC_URL + '/words.txt');
  const text = await response.text();
  return text
    .split('\n')
    .map(w => w.trim().toUpperCase())
    .filter(Boolean);
}