import _ from "lodash";
import { RangeTypes } from "@responsible-ai/mlchartlib";
import {
  Text,
  TextField,
  TooltipHost,
  TooltipOverflowMode,
  IProcessedStyleSet,
  DefaultButton,
  IconButton,
  PrimaryButton,
  Callout,
  DirectionalHint,
  Checkbox,
  ComboBox,
  IComboBox,
  IComboBoxOption,
  CheckboxVisibility,
  DetailsList,
  Selection,
  SelectionMode,
  SpinButton
} from "office-ui-fabric-react";
import { Position } from "office-ui-fabric-react/lib/utilities/positioning";
import React from "react";
import { localization } from "../../../Localization/localization";
import { Cohort } from "../../Cohort";
import { FilterMethods, IFilter } from "../../Interfaces/IFilter";
import { IJointMeta, JointDataset } from "../../JointDataset";
import { CohortList } from "../CohortList/CohortList";
import { FabricStyles } from "../../FabricStyles";
import {
  cohortEditorCallout,
  cohortEditorStyles,
  tooltipHostStyles,
  ICohortEditorStyles
} from "./CohortEditor.styles";

export interface ICohort {
  filterList: IFilter[];
  cohortName: string;
}

export interface ICohortEditorProps {
  jointDataset: JointDataset;
  filterList: IFilter[];
  cohortName: string;
  isNewCohort: boolean;
  deleteIsDisabled: boolean;
  onSave: (newCohort: Cohort) => void;
  onCancel: () => void;
  onDelete: () => void;
}

export interface ICohortEditorState {
  openedFilter?: IFilter;
  filterIndex?: number;
  filters: IFilter[];
  cohortName: string;
}

export class CohortEditor extends React.PureComponent<
  ICohortEditorProps,
  ICohortEditorState
> {
  private static filterMethodLabels: { [key in FilterMethods]: string } = {
    [FilterMethods.Equal]: localization.FilterOperations.equals,
    [FilterMethods.GreaterThan]: localization.FilterOperations.greaterThan,
    [FilterMethods.GreaterThanEqualTo]:
      localization.FilterOperations.greaterThanEquals,
    [FilterMethods.LessThan]: localization.FilterOperations.lessThan,
    [FilterMethods.LessThanEqualTo]:
      localization.FilterOperations.lessThanEquals,
    [FilterMethods.Includes]: localization.FilterOperations.includes,
    [FilterMethods.InTheRangeOf]: localization.FilterOperations.inTheRangeOf
  };
  private _leftSelection: Selection;
  private readonly dataArray: IComboBoxOption[] = new Array(
    this.props.jointDataset.datasetFeatureCount
  )
    .fill(0)
    .map((_, index) => {
      const key = JointDataset.DataLabelRoot + index.toString();
      return {
        key,
        text: this.props.jointDataset.metaDict[key].abbridgedLabel
      };
    });

  private readonly leftItems = [
    JointDataset.IndexLabel,
    JointDataset.DataLabelRoot,
    JointDataset.PredictedYLabel,
    JointDataset.TrueYLabel,
    JointDataset.ClassificationError,
    JointDataset.RegressionError
  ].reduce(
    (previousValue: Array<{ key: string; title: string }>, key: string) => {
      const metaVal = this.props.jointDataset.metaDict[key];
      if (key === JointDataset.DataLabelRoot) {
        previousValue.push({ key, title: "Dataset" });
        return previousValue;
      }
      if (metaVal === undefined) {
        return previousValue;
      }
      previousValue.push({ key, title: metaVal.abbridgedLabel });
      return previousValue;
    },
    []
  );

  private comparisonOptions: IComboBoxOption[] = [
    {
      key: FilterMethods.Equal,
      text: localization.Filters.equalComparison
    },
    {
      key: FilterMethods.GreaterThan,
      text: localization.Filters.greaterThanComparison
    },
    {
      key: FilterMethods.GreaterThanEqualTo,
      text: localization.Filters.greaterThanEqualToComparison
    },
    {
      key: FilterMethods.LessThan,
      text: localization.Filters.lessThanComparison
    },
    {
      key: FilterMethods.LessThanEqualTo,
      text: localization.Filters.lessThanEqualToComparison
    },
    {
      key: FilterMethods.InTheRangeOf,
      text: localization.Filters.inTheRangeOf
    }
  ];
  private _isInitialized = false;

  public constructor(props: ICohortEditorProps) {
    super(props);
    this.state = {
      openedFilter: undefined,
      filterIndex: this.props.filterList.length,
      filters: this.props.filterList,
      cohortName: this.props.cohortName
    };
    this._leftSelection = new Selection({
      selectionMode: SelectionMode.single,
      onSelectionChanged: this._setSelection
    });
    this._leftSelection.setItems(this.leftItems);
    this._isInitialized = true;
  }

  public render(): React.ReactNode {
    const styles = cohortEditorStyles();
    const cohortEditor = cohortEditorCallout();
    const openedFilter = this.state.openedFilter;
    const filterList = this.state.filters.map((filter, index) => {
      return (
        <div key={index} className={styles.existingFilter}>
          {this.setFilterLabel(filter, styles)}
          <IconButton
            className={styles.filterIcon}
            iconProps={{ iconName: "Edit" }}
            onClick={this.editFilter.bind(this, index)}
          />
          <IconButton
            className={styles.filterIcon}
            iconProps={{ iconName: "Clear" }}
            onClick={this.removeFilter.bind(this, index)}
          />
        </div>
      );
    });

    return (
      <Callout
        setInitialFocus={true}
        hidden={false}
        styles={cohortEditor}
        doNotLayer={true}
        coverTarget
        target={`#${CohortList.bannerId}`}
        isBeakVisible={false}
        gapSpace={100}
        directionalHint={DirectionalHint.topCenter}
      >
        <div className={styles.container}>
          <IconButton
            className={styles.closeIcon}
            iconProps={{ iconName: "ChromeClose" }}
            onClick={this.closeCallout.bind(this)}
          />
          <TextField
            className={styles.cohortName}
            value={this.state.cohortName}
            label={localization.CohortEditor.cohortNameLabel}
            placeholder={localization.CohortEditor.cohortNamePlaceholder}
            onGetErrorMessage={this._getErrorMessage}
            validateOnLoad={false}
            onChange={this.setCohortName}
          />

          <div className={styles.wrapper}>
            <div className={styles.leftHalf}>
              <DetailsList
                className={styles.detailedList}
                items={this.leftItems}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="Row checkbox"
                checkboxVisibility={CheckboxVisibility.hidden}
                onRenderDetailsHeader={this._onRenderDetailsHeader.bind(
                  this,
                  styles
                )}
                selection={this._leftSelection}
                selectionPreservedOnEmptyClick={true}
                setKey={"set"}
                columns={[
                  {
                    key: "col1",
                    name: "name",
                    minWidth: 150,
                    fieldName: "title"
                  }
                ]}
              />
            </div>
            {!openedFilter ? (
              <div className={styles.rightHalf}>
                <Text className={styles.defaultText} variant={"medium"}>
                  {localization.CohortEditor.defaultFilterState}
                </Text>
              </div>
            ) : (
              this.buildRightPanel(openedFilter, styles)
            )}
          </div>
          <div>
            <Text variant={"medium"} className={styles.addedFilter}>
              {localization.CohortEditor.addedFilters}
            </Text>
            <div className={styles.addedFilterDiv}>
              {filterList.length > 0 ? (
                <div>{filterList}</div>
              ) : (
                <div>
                  <Text
                    variant={"smallPlus"}
                    className={styles.defaultFilterList}
                  >
                    {localization.CohortEditor.noAddedFilters}
                  </Text>
                </div>
              )}
            </div>
          </div>
          {this.props.isNewCohort ? (
            <PrimaryButton
              onClick={this.saveCohort}
              className={styles.saveCohort}
            >
              {localization.CohortEditor.save}
            </PrimaryButton>
          ) : (
            <div className={styles.saveAndDeleteDiv}>
              <DefaultButton
                disabled={this.props.deleteIsDisabled}
                onClick={this.deleteCohort.bind(this)}
                className={styles.deleteCohort}
              >
                {localization.CohortEditor.delete}
              </DefaultButton>
              <PrimaryButton
                onClick={this.saveCohort}
                className={styles.saveCohort}
              >
                {localization.CohortEditor.save}
              </PrimaryButton>
            </div>
          )}
        </div>
      </Callout>
    );
  }

  private closeCallout = (): void => {
    this.props.onCancel();
  };

  private deleteCohort = (): void => {
    this.props.onDelete();
  };

  private readonly setAsCategorical = (
    _ev?: React.FormEvent,
    checked?: boolean
  ): void => {
    if (checked === undefined || !this.state.openedFilter) {
      return;
    }
    const openedFilter = this.state.openedFilter;
    this.props.jointDataset.setTreatAsCategorical(openedFilter.column, checked);
    if (checked) {
      this.setState({
        openedFilter: {
          arg: [],
          method: FilterMethods.Includes,
          column: openedFilter.column
        }
      });
    } else {
      this.setState({
        openedFilter: {
          arg: [
            this.props.jointDataset.metaDict[openedFilter.column].featureRange
              ?.max || Number.MAX_SAFE_INTEGER
          ],
          method: FilterMethods.LessThan,
          column: openedFilter.column
        }
      });
    }
  };

  private _getErrorMessage = (): string | undefined => {
    if (this.state.cohortName.length <= 0) {
      return localization.CohortEditor.cohortNameError;
    }
    return undefined;
  };

  private readonly _setSelection = (): void => {
    if (!this._isInitialized) {
      return;
    }
    if (this._leftSelection.getSelection().length !== 0) {
      let property = this._leftSelection.getSelection()[0].key as string;
      if (property === JointDataset.DataLabelRoot) {
        property += "0";
      }
      this.setDefaultStateForKey(property);
    }
  };

  private readonly setSelectedProperty = (
    _: React.FormEvent<IComboBox>,
    item?: IComboBoxOption
  ): void => {
    if (typeof item?.key === "string") {
      const property = item.key;
      // reset filterIndex to handle if user clicks on another filter while in edit mode
      this.setState({ filterIndex: this.state.filters.length });
      this.setDefaultStateForKey(property);
    }
  };

  private saveState = (index?: number): void => {
    if (!this.state.openedFilter || index === undefined) {
      return;
    }
    this.updateFilter(this.state.openedFilter, index);
    this._leftSelection.setAllSelected(false);
  };

  private readonly _onRenderDetailsHeader = (
    styles: IProcessedStyleSet<ICohortEditorStyles>
  ): JSX.Element => {
    return (
      <div className={styles.filterHeader}>
        {localization.CohortEditor.selectFilter}
      </div>
    );
  };

  private readonly setCategoricalValues = (
    _ev?: React.FormEvent<IComboBox>,
    item?: IComboBoxOption
  ): void => {
    if (!this.state.openedFilter || !item?.key) {
      return;
    }
    const openedFilter = this.state.openedFilter;
    const selectedVals = [...(openedFilter.arg as number[])];

    const index = selectedVals.indexOf(item.key as number);
    if (item.selected && index === -1) {
      selectedVals.push(item.key as number);
    } else {
      selectedVals.splice(index, 1);
    }
    this.setState({
      openedFilter: {
        arg: selectedVals,
        method: openedFilter.method,
        column: openedFilter.column
      }
    });
  };

  private readonly setComparison = (
    _ev?: React.FormEvent<IComboBox>,
    item?: IComboBoxOption
  ): void => {
    if (!this.state.openedFilter || !item) {
      return;
    }
    const openedFilter = this.state.openedFilter;
    if ((item.key as FilterMethods) === FilterMethods.InTheRangeOf) {
      //default values for in the range operation
      const meta = this.props.jointDataset.metaDict[openedFilter.column]
        .featureRange;
      openedFilter.arg[0] = meta?.min || Number.MIN_SAFE_INTEGER;
      openedFilter.arg[1] = meta?.max || Number.MAX_SAFE_INTEGER;
    } else {
      //handle switch from in the range to less than, equals etc
      openedFilter.arg = openedFilter.arg.slice(0, 1);
    }
    this.setState({
      openedFilter: {
        arg: openedFilter.arg,
        method: item.key as FilterMethods,
        column: openedFilter.column
      }
    });
  };

  private readonly setNumericValue = (
    delta: number,
    column: IJointMeta,
    index: number,
    stringVal: string
  ): string | void => {
    if (!this.state.openedFilter) {
      return;
    }
    const openArg = this.state.openedFilter.arg;
    const max = column.featureRange?.max || Number.MAX_SAFE_INTEGER;
    const min = column.featureRange?.min || Number.MIN_SAFE_INTEGER;
    if (delta === 0) {
      const numberVal = +stringVal;
      if (
        (!Number.isInteger(numberVal) &&
          column.featureRange?.rangeType === RangeTypes.Integer) ||
        numberVal > max ||
        numberVal < min
      ) {
        return this.state.openedFilter.arg[index].toString();
      }
      openArg[index] = numberVal;
    } else {
      const prevVal = openArg[index];
      const newVal = prevVal + delta;
      if (newVal > max || newVal < min) {
        return prevVal.toString();
      }
      openArg[index] = newVal;
    }

    // in the range validation
    if (openArg[1] <= openArg[0]) {
      openArg[1] = max;
    }

    this.setState({
      openedFilter: {
        arg: openArg,
        method: this.state.openedFilter.method,
        column: this.state.openedFilter.column
      }
    });
  };

  private setDefaultStateForKey(key: string): void {
    const filter: IFilter = { column: key } as IFilter;
    const meta = this.props.jointDataset.metaDict[key];
    if (meta.treatAsCategorical && meta.sortedCategoricalValues) {
      filter.method = FilterMethods.Includes;
      filter.arg = [...new Array(meta.sortedCategoricalValues.length).keys()];
    } else {
      filter.method = FilterMethods.LessThan;
      filter.arg = [meta.featureRange?.max || Number.MAX_SAFE_INTEGER];
    }
    this.setState({
      openedFilter: filter
    });
  }

  private updateFilter(filter: IFilter, index: number): void {
    const filters = [...this.state.filters];
    filters[index] = filter;
    this.setState({
      filters,
      openedFilter: undefined,
      filterIndex: this.state.filters.length
    });
  }

  private cancelFilter = (): void => {
    this.setState({ openedFilter: undefined });
  };

  private removeFilter(index: number): void {
    const filters = [...this.state.filters];
    filters.splice(index, 1);
    this.setState({ filters });
  }

  private editFilter(index: number): void {
    const editFilter = this.state.filters[index];
    this.setState({
      filterIndex: index,
      openedFilter: _.cloneDeep(editFilter)
    });
  }

  private saveCohort = (): void => {
    if (this.state.cohortName.length > 0) {
      const newCohort = new Cohort(
        this.state.cohortName,
        this.props.jointDataset,
        this.state.filters
      );
      this.props.onSave(newCohort);
    }
  };

  private setCohortName = (
    _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    if (newValue) {
      this.setState({ cohortName: newValue });
    }
  };

  private roundDecimalValue(value: number): number {
    return value % 1 !== 0 ? Math.round(value * 10000) / 10000 : value;
  }

  private setFilterLabel(
    filter: IFilter,
    styles: IProcessedStyleSet<ICohortEditorStyles>
  ): React.ReactNode {
    //TODO: simplify this function
    const tooltip = tooltipHostStyles;
    const selectedFilter = this.props.jointDataset.metaDict[filter.column];
    let stringArgs;
    let label = "";

    if (
      selectedFilter.isCategorical ||
      this.props.jointDataset.metaDict[filter.column].treatAsCategorical
    ) {
      const selectedValues: string[] = [];
      const filterArgs = filter.arg;
      filterArgs.forEach((element) => {
        const value = selectedFilter.sortedCategoricalValues?.[element];
        if (value) {
          selectedValues.push(value);
        }
      });
      stringArgs = selectedValues.toString();
      if (selectedValues.length > 3) {
        const otherValues = selectedValues.slice(0, 3).toString();
        const countOtherValues = selectedValues.length - 3;
        stringArgs = localization.formatString(
          localization.FilterOperations.overflowFilterArgs,
          otherValues,
          countOtherValues.toString()
        );
      }
    } else {
      for (let i = 0; i < filter.arg.length; i++) {
        filter.arg[i] = this.roundDecimalValue(filter.arg[i]);
      }
      stringArgs = filter.arg.toString();
    }

    if (filter.method === FilterMethods.InTheRangeOf) {
      // example: Age [30,40]
      label = `${selectedFilter.abbridgedLabel} ${localization.formatString(
        localization.FilterOperations.inTheRangeOf,
        stringArgs
      )}`;
    } else {
      // example: Age < 30
      label = `${selectedFilter.abbridgedLabel} ${localization.formatString(
        CohortEditor.filterMethodLabels[filter.method],
        stringArgs
      )}`;
    }

    return (
      <TooltipHost
        overflowMode={TooltipOverflowMode.Self}
        hostClassName={styles.filterLabel}
        content={label}
        onTooltipToggle={(): boolean => false}
        styles={tooltip}
      >
        {label}
      </TooltipHost>
    );
  }

  private buildRightPanel(
    openedFilter: IFilter,
    styles: IProcessedStyleSet<ICohortEditorStyles>
  ): React.ReactNode {
    const selectedMeta = this.props.jointDataset.metaDict[openedFilter.column];
    const numericDelta =
      selectedMeta.treatAsCategorical ||
      selectedMeta.featureRange?.rangeType === RangeTypes.Integer ||
      !selectedMeta.featureRange
        ? 1
        : (selectedMeta.featureRange.max - selectedMeta.featureRange.min) / 10;
    const isDataColumn = openedFilter.column.includes(
      JointDataset.DataLabelRoot
    );
    let categoricalOptions: IComboBoxOption[] | undefined;

    // filterIndex is set when the filter is editing openedFilter and reset to filters.length otherwise
    const isEditingFilter =
      this.state.filterIndex !== this.state.filters.length;

    let minVal, maxVal;
    if (selectedMeta.treatAsCategorical || !selectedMeta.featureRange) {
      // Numerical values treated as categorical are stored with the values in the column,
      // true categorical values store indexes to the string values
      categoricalOptions = selectedMeta.sortedCategoricalValues?.map(
        (label, index) => {
          return { key: index, text: label };
        }
      );
    } else {
      minVal = this.roundDecimalValue(selectedMeta.featureRange.min);
      maxVal = this.roundDecimalValue(selectedMeta.featureRange.max);
    }
    return (
      <div className={styles.rightHalf}>
        {isDataColumn && (
          <ComboBox
            className={styles.featureComboBox}
            styles={FabricStyles.limitedSizeMenuDropdown}
            options={this.dataArray}
            onChange={this.setSelectedProperty}
            label={localization.CohortEditor.selectFilter}
            selectedKey={openedFilter.column}
            calloutProps={FabricStyles.calloutProps}
          />
        )}
        {selectedMeta.featureRange &&
          selectedMeta.featureRange.rangeType === RangeTypes.Integer && (
            <Checkbox
              key={openedFilter.column}
              className={styles.treatCategorical}
              label={localization.CohortEditor.TreatAsCategorical}
              checked={selectedMeta.treatAsCategorical}
              onChange={this.setAsCategorical}
            />
          )}
        {selectedMeta.treatAsCategorical && (
          <div className={styles.featureTextDiv}>
            <Text variant={"small"} className={styles.featureText}>
              {`${localization.formatString(
                localization.Filters.uniqueValues,
                selectedMeta.sortedCategoricalValues?.length
              )}`}
            </Text>
            <ComboBox
              key={openedFilter.column}
              multiSelect
              label={localization.Filters.categoricalIncludeValues}
              className={styles.operationComboBox}
              selectedKey={openedFilter.arg}
              onChange={this.setCategoricalValues}
              options={categoricalOptions}
              useComboBoxAsMenuWidth={true}
              calloutProps={FabricStyles.calloutProps}
              styles={FabricStyles.limitedSizeMenuDropdown}
            />
          </div>
        )}
        {!selectedMeta.treatAsCategorical && (
          <div className={styles.featureTextDiv}>
            <Text block nowrap variant={"small"} className={styles.featureText}>
              {`${localization.formatString(
                localization.Filters.min,
                minVal
              )} ${localization.formatString(
                localization.Filters.max,
                maxVal
              )}`}
            </Text>
            <ComboBox
              label={localization.Filters.numericalComparison}
              className={styles.operationComboBox}
              selectedKey={openedFilter.method}
              onChange={this.setComparison}
              options={this.comparisonOptions}
              useComboBoxAsMenuWidth={true}
              calloutProps={FabricStyles.calloutProps}
            />
            {selectedMeta.featureRange &&
              (openedFilter.method === FilterMethods.InTheRangeOf ? (
                <div className={styles.valueSpinButtonDiv}>
                  <SpinButton
                    labelPosition={Position.top}
                    className={styles.minSpinBox}
                    value={openedFilter.arg[0].toString()}
                    label={localization.Filters.minimum}
                    min={selectedMeta.featureRange.min}
                    max={selectedMeta.featureRange.max}
                    onIncrement={this.setNumericValue.bind(
                      this,
                      numericDelta,
                      selectedMeta,
                      0
                    )}
                    onDecrement={this.setNumericValue.bind(
                      this,
                      -numericDelta,
                      selectedMeta,
                      0
                    )}
                    onValidate={this.setNumericValue.bind(
                      this,
                      0,
                      selectedMeta,
                      0
                    )}
                  />
                  <SpinButton
                    labelPosition={Position.top}
                    className={styles.maxSpinBox}
                    value={openedFilter.arg[1].toString()}
                    label={localization.Filters.maximum}
                    min={selectedMeta.featureRange.min}
                    max={selectedMeta.featureRange.max}
                    onIncrement={this.setNumericValue.bind(
                      this,
                      numericDelta,
                      selectedMeta,
                      1
                    )}
                    onDecrement={this.setNumericValue.bind(
                      this,
                      -numericDelta,
                      selectedMeta,
                      1
                    )}
                    onValidate={this.setNumericValue.bind(
                      this,
                      0,
                      selectedMeta,
                      1
                    )}
                  />
                </div>
              ) : (
                <div className={styles.valueSpinButtonDiv}>
                  <SpinButton
                    labelPosition={Position.top}
                    className={styles.valueSpinButton}
                    label={localization.Filters.numericValue}
                    min={selectedMeta.featureRange.min}
                    max={selectedMeta.featureRange.max}
                    value={openedFilter.arg[0].toString()}
                    onIncrement={this.setNumericValue.bind(
                      this,
                      numericDelta,
                      selectedMeta,
                      0
                    )}
                    onDecrement={this.setNumericValue.bind(
                      this,
                      -numericDelta,
                      selectedMeta,
                      0
                    )}
                    onValidate={this.setNumericValue.bind(
                      this,
                      0,
                      selectedMeta,
                      0
                    )}
                  />
                </div>
              ))}
          </div>
        )}
        {isEditingFilter ? (
          <div className={styles.saveAndCancelDiv}>
            <DefaultButton
              className={styles.saveFilterButton}
              text={localization.CohortEditor.save}
              onClick={this.saveState.bind(this, this.state.filterIndex)}
            />
            <DefaultButton
              className={styles.cancelFilterButton}
              text={localization.CohortEditor.cancel}
              onClick={this.cancelFilter.bind(this)}
            />
          </div>
        ) : (
          <DefaultButton
            className={styles.addFilterButton}
            text={localization.CohortEditor.addFilter}
            onClick={this.saveState.bind(this, this.state.filters.length)}
          />
        )}
      </div>
    );
  }
}
