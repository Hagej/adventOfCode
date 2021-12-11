export function debugLog(s: string) {
  if (process.argv[2] === "debug") {
    console.log(s);
  }
}
