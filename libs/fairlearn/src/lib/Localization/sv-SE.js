module.exports = {
  loremIpsum:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  defaultClassNames: "Klass {0}",
  defaultFeatureNames: "Känslig funktion {0}",
  defaultSingleFeatureName: "Känslig funktion",
  defaultCustomMetricName: "Anpassat mått {0}",
  accuracyTab: "Rättvisa i prestanda",
  opportunityTab: "Rättvisa i affärsmöjlighet",
  modelComparisonTab: "Modelljämförelse",
  tableTab: "Detaljvy",
  dataSpecifications: "Datastatistik",
  attributes: "Attribut",
  singleAttributeCount: "1 känslig funktion",
  attributesCount: "{0} känsliga funktioner",
  instanceCount: "{0} instanser",
  close: "Stäng",
  calculating: "Beräknar...",
  accuracyMetric: "Prestandamått",
  errorOnInputs:
    "Fel med indata. De känsliga funktionerna måste vara kategoriska värden just nu. Mappa värden till diskretiserade kategorier och försök igen.",
  Accuracy: {
    header: "Hur vill du mäta prestanda?",
    modelMakes: "modellen gör",
    modelsMake: "modellerna gör",
    body:
      "Dina data innehåller {0} etiketter och {2} {1} förutsägelser. Baserat på den informationen rekommenderar vi följande mått. Välj ett mått från listan.",
    binaryClassifier: "binär klassificerare",
    probabalisticRegressor: "probitregressor",
    regressor: "regressor",
    binary: "binär",
    continuous: "kontinuerlig"
  },
  Parity: {
    header: "Rättvisa mätt avseende diskrepans",
    body:
      "Diskrepansmått kvantifierar variationer i dina modellers beteende för valda funktioner. Det finns två olika typer av diskrepansmått: mer kommer..."
  },
  Header: {
    title: "Fairlearn",
    documentation: "Dokumentation"
  },
  Footer: {
    back: "Tillbaka",
    next: "Nästa"
  },
  Intro: {
    welcome: "Välkommen till",
    fairlearnDashboard: "Fairlearn-instrumentpanel",
    introBody:
      "Med Fairlearn-instrumentpanelen kan du utvärdera kompromisser mellan prestanda och rättvisa för dina modeller",
    explanatoryStep:
      "Om du vill konfigurera utvärderingen måste du ange en känslig funktion och ett prestandamått.",
    getStarted: "Kom igång",
    features: "Känsliga funktioner",
    featuresInfo:
      "Känsliga funktioner används för att dela upp dina data i grupper. Din modells rättvisa för dessa grupper mäts av diskrepansmått. Diskrepansmått anger hur mycket av modellens beteende som varierar för de här grupperna.",
    accuracy: "Prestandamått",
    accuracyInfo:
      "Prestandamått används för att utvärdera den totala kvaliteten på din modell och kvaliteten på din modell i varje grupp. Skillnaden mellan de extrema värdena på prestandamåttet i grupperna rapporteras som en prestandadiskrepans."
  },
  ModelComparison: {
    title: "Modelljämförelse",
    howToRead: "Så här läser du det här diagrammet",
    lower: "lägre",
    higher: "högre",
    howToReadText:
      "Det här diagrammet representerar var och en av {0}-modellerna som en valbar punkt. X-axeln representerar {1}, där {2} är bättre. Y-axeln representerar diskrepans, där lägre är bättre.",
    insights: "Insikter",
    insightsText1: "Diagrammet visar {0} och diskrepanser för {1} modeller.",
    insightsText2:
      "{0} intervall från {1} till {2}. Diskrepansen är från {3} till {4}.",
    insightsText3:
      "Den mest exakta modellen uppnår {0} av {1} och en diskrepans på {2}.",
    insightsText4:
      "Modellen med lägsta diskrepans uppnår {0} av {1} och en diskrepans på {2}.",
    disparityInOutcomes: "Diskrepans i förutsägelser",
    disparityInAccuracy: "Diskrepans i {0}",
    howToMeasureDisparity: "Hur ska diskrepanser mätas?"
  },
  Report: {
    modelName: "Modell {0}",
    title: "Prestandadiskrepans",
    globalAccuracyText: "Är den totala {0}",
    accuracyDisparityText: "Är diskrepansen i {0}",
    editConfiguration: "Redigera konfigurationen",
    backToComparisons: "Multimodellvy",
    outcomesTitle: "Diskrepans i förutsägelser",
    minTag: "Min",
    maxTag: "Max",
    groupLabel: "Undergrupp",
    underestimationError: "Underförutsägelse",
    underpredictionExplanation: "(uppskattat = 0, sant = 1)",
    overpredictionExplanation: "(uppskattat = 1, sant = 0)",
    overestimationError: "Överförutsägelse",
    classificationOutcomesHowToRead:
      "I stapeldiagrammet visas markeringshastigheten i varje grupp, vilket innebär fraktionen punkter som klassificeras som 1.",
    regressionOutcomesHowToRead:
      "I låddiagram visas fördelningen av förutsägelser i varje grupp. Enskilda datapunkter läggs ovanpå.",
    classificationAccuracyHowToRead1:
      "Stapeldiagrammet visar distributionen av fel i varje grupp.",
    classificationAccuracyHowToRead2:
      "Fel delas upp i överförutsägelsefel (förutsäger 1 när den sanna etiketten är 0) och underförutsägelsefel (förutsäger 0 när den sanna etiketten är 1).",
    classificationAccuracyHowToRead3:
      "De rapporterade frekvenserna erhålls genom att dela antalet fel med den totala gruppstorleken.",
    probabilityAccuracyHowToRead1:
      "Stapeldiagrammet visar ett absolut fel i varje grupp, uppdelat på överförutsägelse och underförutsägelse.",
    probabilityAccuracyHowToRead2:
      "I varje exempel mäter vi skillnaden mellan förutsägelse och etikett. Om det är positivt, så kallar vi det överförutsägelse och om det är negativt så kallar vi det underförutsägelse.",
    probabilityAccuracyHowToRead3:
      "Vi rapporterar summan av antalet överförutsägelser och summan av antalet underförutsägelser dividerat med den totala gruppstorleken.",
    regressionAccuracyHowToRead:
      "Fel är skillnaden mellan förutsägelsen och etiketten. I låddiagram visas fördelningen av fel i varje grupp. Enskilda datapunkter läggs ovanpå.",
    distributionOfPredictions: "Distribution av förutsägelser",
    distributionOfErrors: "Distribution av fel",
    tooltipPrediction: "Förutsägelse: {0}",
    tooltipError: "Fel: {0}"
  },
  Feature: {
    header: "Efter vilka funktioner vill du utvärdera din modells rättvisa?",
    body:
      "Rättvisa utvärderas i förhållande till diskrepanser i modellens beteende. Vi delar upp dina data enligt värdena för varje vald funktion och utvärderar hur modellens prestandamått och förutsägelser skiljer sig åt i dessa delningar.",
    learnMore: "Läs mer",
    summaryCategoricalCount: "Den här funktionen har {0} unika värden",
    summaryNumericCount:
      "Den här numeriska funktionen sträcker sig från {0} till {1} och grupperas i {2} diskretiseringar.",
    showCategories: "Visa alla",
    hideCategories: "Minimera",
    categoriesOverflow: "   och {0} ytterligare kategorier",
    editBinning: "Redigera grupper",
    subgroups: "Undergrupper"
  },
  Metrics: {
    accuracyScore: "Noggrannhet",
    precisionScore: "Precision",
    recallScore: "Träffsäkerhet",
    zeroOneLoss: "Zero-one-förlust",
    specificityScore: "Specificitetspoäng",
    missRate: "Missfrekvens",
    falloutRate: "Utfallshastighet",
    maxError: "Max fel",
    meanAbsoluteError: "Medelvärde för absoluta fel",
    meanSquaredError: " MSE (medelkvadratfel)",
    meanSquaredLogError: "Medelkvadratvärde för loggfel",
    medianAbsoluteError: "Medianvärde av absoluta fel",
    average: "Genomsnittlig förutsägelse",
    selectionRate: "Markeringshastighet",
    overprediction: "Överförutsägelse",
    underprediction: "Underförutsägelse",
    r2_score: "R-kvadratvärde",
    rms_error: "RMSE (rot-medelkvadratfel)",
    auc: "Område under ROC-kurvan",
    balancedRootMeanSquaredError: "Balanserad RMSE",
    balancedAccuracy: "Balanserad noggrannhet",
    f1Score: "F1-Score",
    logLoss: "Log Loss",
    accuracyDescription: "Datapunktsfraktionen klassificeras korrekt.",
    precisionDescription:
      "Fraktionen av datapunkter som klassificeras korrekt bland de som klassificerats som 1.",
    recallDescription:
      "Fraktionen av datapunkter som klassificeras korrekt bland de vars sanna etikett är 1. Alternativa namn: sant positiv hastighet, känslighet.",
    rmseDescription: "Kvadratroten för genomsnittet av kvadratfel.",
    mseDescription: "Medelvärdet för kvadratfel.",
    meanAbsoluteErrorDescription:
      "Medelvärdet av absoluta värden för fel. Mer robust för extremvärden än MSE.",
    r2Description:
      "Fraktionen av varians i etiketterna som beskrivs av modellen.",
    aucDescription:
      "Kvaliteten på förutsägelserna, visade som poäng, vid separering av positiva exempel från negativa exempel.",
    balancedRMSEDescription:
      "Positiva och negativa exempel viktas om för att ha samma total viktning. Lämpligt om underliggande data är högt obalanserade.",
    balancedAccuracyDescription:
      "Positiva och negativa exempel viktas om för att ha samma total viktning. Lämpligt om underliggande data är högt obalanserade.",
    f1ScoreDescription: "F1-Score is the harmonic mean of precision and recall."
  },
  BinDialog: {
    header: "Konfigurera diskretiseringar",
    makeCategorical: "Hantera som kategoriskt",
    save: "Spara",
    cancel: "Avbryt",
    numberOfBins: "Antal diskretiseringar:",
    categoryHeader: "Diskretiserade värden:"
  }
};