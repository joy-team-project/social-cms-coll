export const getValueFromObjectByKeys = (
  obj: any = {},
  keys: string[] = [],
  defaultValue: any = undefined
): any => {
  const length = keys.length;
  if (!obj || length === 0 || Object.keys(obj).length === 0) {
    return defaultValue;
  }
  let output = obj;
  for (let i = 0; i < length; i++) {
    output = output[keys[i]];
    if (output === 0) {
      return 0;
    }
    if (!output) {
      return defaultValue;
    }
  }
  if (output === 0) {
    return 0;
  }
  if (!output) {
    return defaultValue;
  }
  return output || defaultValue;
};
