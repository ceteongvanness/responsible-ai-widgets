import { AccuracyOptions } from "../util/AccuracyMetrics";

export class FormatMetrics {
  public static formatNumbers = (
    value: number | undefined,
    key: string,
    isRatio = false,
    sigDigits = 3
  ): string => {
    if (value === null || value === undefined) {
      return NaN.toString();
    }
    const styleObject: Intl.NumberFormatOptions = {
      maximumSignificantDigits: sigDigits
    };
    if (AccuracyOptions[key] && AccuracyOptions[key].isPercentage && !isRatio) {
      styleObject.style = "percent";
    }
    return value.toLocaleString(undefined, styleObject);
  };
}