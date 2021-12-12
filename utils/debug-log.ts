export function debugLog(...s: any) {
  if (process.argv[2] === "debug") {
    console.log(...s);
  }
}
