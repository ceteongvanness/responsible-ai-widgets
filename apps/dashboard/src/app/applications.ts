import { IExplanationDashboardData } from "@responsible-ai/interpret";
import { IFairnessData } from "@responsible-ai/fairlearn";
import { binaryClassifier } from "../fairlearn/__mock-data/binaryClassifier";
import { regression } from "../fairlearn/__mock-data/regression";
import { probit } from "../fairlearn/__mock-data/probit";
import { precomputedBinary } from "../fairlearn/__mock-data/precomputedBinary";
import { precomputedBinaryTwo } from "../fairlearn/__mock-data/precomputedBinaryTwo";
import { automlMimicAdult } from "../interpret/__mock_data/automlMimicAdult";
import { bostonData } from "../interpret/__mock_data/bostonData";
import { bostonDataGlobal } from "../interpret/__mock_data/bostonDataGlobal";
import { irisData } from "../interpret/__mock_data/irisData";
import { irisGlobal } from "../interpret/__mock_data/irisGlobal";
import { irisDataGlobal } from "../interpret/__mock_data/irisDataGlobal";
import { ibmData } from "../interpret/__mock_data/ibmData";
import { ibmDataInconsistent } from "../interpret/__mock_data/ibmDataInconsistent";
import { breastCancerData } from "../interpret/__mock_data/dummyData";
import { irisNoData } from "../interpret/__mock_data/irisNoData";
import { largeFeatureCount } from "../interpret/__mock_data/largeFeatureCount";
import { ibmNoClass } from "../interpret/__mock_data/ibmNoClass";
import { irisNoFeatures } from "../interpret/__mock_data/irisNoFeatures";

export interface IInterpretDataSet {
  data: IExplanationDashboardData;
  classDimension: number;
}

export interface IFairLearnDataSet {
  data: IFairnessData;
}

export interface IDataSet<TDataSet> {
  datasets: { [key: string]: TDataSet };
}

export interface IInterpretSetting {
  versions: { [key: string]: 1 | 2 };
}

export interface IFairLearnSetting {
  versions: { [key: string]: 1 | 2 };
}

export const applicationKeys = <const>["interpret", "fairlearn"];

export type IApplications = {
  [key in typeof applicationKeys[number]]: unknown;
} & {
  fairlearn: IFairLearnSetting & IDataSet<IFairLearnDataSet>;
  interpret: IInterpretSetting & IDataSet<IInterpretDataSet>;
};

export const applications: IApplications = <const>{
  interpret: {
    versions: { "Version-1": 1, "Version-2": 2 },
    datasets: {
      automlMimicAdult: { data: automlMimicAdult, classDimension: 3 },
      bostonData: { data: bostonData, classDimension: 1 },
      bostonDataGlobal: { data: bostonDataGlobal, classDimension: 1 },
      irisData: { data: irisData, classDimension: 3 },
      irisGlobal: { data: irisGlobal, classDimension: 3 },
      irisDataGlobal: { data: irisDataGlobal, classDimension: 3 },
      ibmData: { data: ibmData, classDimension: 2 },
      ibmDataInconsistent: { data: ibmDataInconsistent, classDimension: 2 },
      breastCancer: { data: breastCancerData, classDimension: 2 },
      ibmNoClass: { data: ibmNoClass, classDimension: 2 },
      irisNoFeature: { data: irisNoFeatures, classDimension: 3 },
      ebmData: { data: ibmData, classDimension: 2 },
      irisNoData: { data: irisNoData, classDimension: 3 },
      largeFeatureCount: { data: largeFeatureCount, classDimension: 2 }
    }
  },
  fairlearn: {
    versions: { "Version-1": 1, "Version-2": 2 },
    datasets: {
      binaryClassifier: { data: binaryClassifier },
      regression: { data: regression },
      probit: { data: probit },
      precomputedBinary: { data: precomputedBinary },
      precomputedBinaryTwo: { data: precomputedBinaryTwo }
    }
  }
};