import * as bs58 from "bs58";
import * as hash from "hash.js";

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const getNow = (): number => new Date().getTime();

export const getRawPeerId = (peerId: string): string => {
  // There's two versions of the peer id:
  // - The new versions start with "12"
  // - The old versions start with "Qm"

  // The first step of either version is to base58 decode it.
  const buf = bs58.decode(peerId);

  // Get the first two byte prefix.
  const prefix = buf.slice(0, 2).toString("hex");

  // The new prefix.
  if (prefix == "0024") {
    return hash.sha256().update(buf.slice(2)).digest("hex");
  }

  // The old prefix.
  if (prefix == "1220") {
    return buf.slice(2).toString("hex");
  }

  return "";
};

/*
 * Turn the map<String, Object> to an Object so it can be converted to JSON
 */
export function mapToObj(inputMap: Map<string, number>): any {
  const obj = {};

  inputMap.forEach(function (value, key) {
    obj[key] = value;
  });

  return obj;
}
