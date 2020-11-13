export const randomChoice = <T>(a: T[]) =>
  a[Math.floor(Math.random() * a.length)];
