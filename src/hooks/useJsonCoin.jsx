export function useJsonCoin(string) {
  return Number(string).toFixed(2).replace(".", ",").toString();
}
