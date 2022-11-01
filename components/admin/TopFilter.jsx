import React from 'react';
import { FILTER_FIELDS } from '@/utils/constants';
import { BiFilter } from 'react-icons/bi';
import FormikButton from '../forms/FormikButton';
import FormikForm from '../forms/FormikForm';
import Input from '../forms/Input';
import Select from '../forms/Select';
import { useFormikContext } from 'formik';
import { booleanOptions, fieldsToOptions } from '@/utils/helpers';
import { filterSchema } from '../forms/schemas/admin-schema';
import Humanize from 'humanize-plus';

const TopFilter = ({ filterFields, filterOutput, pageName }) => {
  if (!filterFields || Object.keys(filterFields).length === 0) {
    return <div>&nbsp;</div>;
  }

  const { setFilter, activeFilterText, hasFilter } = filterOutput;

  return (
    <>
      <section className="container-fluid">
        <div className="row">
          {hasFilter ? (
            activeFilterText
          ) : (
            <FilterComponent
              pageName={pageName}
              setFilter={setFilter}
              filterFields={filterFields}
            />
          )}
        </div>
      </section>
    </>
  );
};

const FilterComponent = ({ pageName, setFilter, filterFields }) => {
  const [openFilter, setOpenFilter] = React.useState(false);

  return (
    <div className="dropdown">
      <div
        className="btn btn-sm btn-info px-3"
        role="button"
        id="filterLink"
        data-bs-toggle="dropdown"
        aria-expanded={openFilter}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <BiFilter /> &nbsp; Filter {pageName}
      </div>
      <aside
        className={`dropdown-menu p-3 dropdown-filter ${
          openFilter ? 'show' : ''
        }`}
        aria-labelledby="filterLink"
      >
        <h5 className="filter-header border-bottom">Filter Options</h5>
        <div className="filter-body">
          <FormikForm
            schema={filterSchema}
            name="filter-form"
            handleSubmit={(values, actions) => {
              setFilter(values);
              setOpenFilter(false);
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            <FilterFields fields={filterFields} pageName={pageName} />
          </FormikForm>
        </div>
      </aside>
    </div>
  );
};

const FilterFields = ({ fields, pageName }) => {
  const selectFields = Object.keys(fields);
  const selectLabels = selectFields.reduce(
    (acc, field) =>
      fields[field]?.label ? { ...acc, [field]: fields[field]?.label } : acc,
    {}
  );

  const formikProps = useFormikContext();
  const currentField = formikProps?.values?.field;
  const currentLabel = Humanize.capitalize(
    fields[currentField]?.label || currentField
  );
  const currentValue = formikProps?.values?.value;
  const formFieldType = currentField
    ? fields?.[currentField]?.field || FILTER_FIELDS.TEXT
    : null;

  return (
    <div className="row">
      <Select
        label="Field"
        name="field"
        placeholder="Select a Filter Field"
        options={fieldsToOptions(selectFields, 'Select Field...', selectLabels)}
      />

      {!formFieldType && (
        <Input
          name="value"
          label="Value"
          placeholder="Select a field above"
          disabled
        />
      )}
      {formFieldType === FILTER_FIELDS.TEXT && (
        <Input
          label="Value"
          name="value"
          placeholder={`Type in substring of ${currentLabel}`}
          tooltipText={`Type in substring of ${currentLabel}`}
        />
      )}

      {formFieldType === FILTER_FIELDS.SELECT && (
        <Select
          label="Value"
          name="value"
          tooltipText="Choose one of the below fields"
          options={fields?.[currentField]?.values || booleanOptions()}
          blankOption={`Select ${currentLabel}...`}
        />
      )}

      <div className="text-end">
        <FormikButton disabled={!currentField || !currentValue} color="info">
          Filter {pageName}
        </FormikButton>
      </div>
    </div>
  );
};

export default TopFilter;
