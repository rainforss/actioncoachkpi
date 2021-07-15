export const calculateKpiTotal = (kpiList: Array<any>) => {
  const reducer = (accumulatedObj: any, currentObj: any) => {
    Object.keys(currentObj).forEach((key) => {
      if (typeof currentObj[key] === "number") {
        accumulatedObj[key]
          ? (accumulatedObj[key] += currentObj[key])
          : (accumulatedObj[key] = currentObj[key]);
      }
    });
    return accumulatedObj;
  };
  const result = kpiList.reduce(reducer, {});
  Object.keys(result).forEach((key) => {
    if (typeof result[key] === "number") {
      result[key] = result[key].toFixed(2);
    }
  });
  return result;
};
