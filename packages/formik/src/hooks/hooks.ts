import { useMemo } from 'react';
import { useFormikContext } from '../FormikContext';
import {
  defaultFormatFn,
  defaultParseFn,
  numberParseFn,
  selectFieldMetaByName,
} from '../helpers/field-helpers';
import {
  FieldHelperProps,
  FieldHookConfig,
  FieldInputProps,
  FieldMetaProps,
  FieldName,
  FieldValue,
  FormatFn,
  FormikState,
  ParseFn
} from '../types';
import { useFormikState } from './useFormikState';
import { isInputEvent, isObject, isShallowEqual } from '../utils';

/**
 * Get props to spread to input elements, like `<input {...fieldProps} />`.
 *
 * Pass `FieldMetaProps` from useFieldMeta, so we don't subscribe twice.
 */
export const useFieldProps = <FormValues, Path extends string>(
    nameOrOptions: FieldName<FormValues, Path> | FieldHookConfig<FormValues, Path>,
    fieldMeta: FieldMetaProps<FieldValue<FormValues, Path>>
  ): FieldInputProps<FormValues, Path> => {
    const {
      handleChange,
      handleBlur,
      setFieldValue,
      getValueFromEvent
    } = useFormikContext<FormValues>();
    const name = isObject(nameOrOptions) ? nameOrOptions.name : nameOrOptions;
    const valueState = fieldMeta.value;
    const touchedState = fieldMeta.touched;

    const field: FieldInputProps<FormValues, Path> = {
      name,
      value: valueState,
      onChange: handleChange,
      onBlur: handleBlur,
    };

    if (isObject(nameOrOptions)) {
      const {
        type = "text",
        value: valueProp, // value is special for checkboxes
        as: is,
        multiple,
        parse = (/number|range/.test(type) ? numberParseFn : defaultParseFn) as ParseFn<FieldValue<FormValues, Path>>,
        format = defaultFormatFn as FormatFn<FieldValue<FormValues, Path>>,
        formatOnBlur = false,
      } = nameOrOptions;

      if (type === 'checkbox') {
        if (valueProp === undefined) {
          field.checked = !!valueState;
        } else {
          field.checked = !!(
            Array.isArray(valueState) && ~valueState.indexOf(valueProp)
          );
          field.value = valueProp;
        }
      } else if (type === 'radio') {
        field.checked = valueState === valueProp;
        field.value = valueProp as any;
      } else if (is === 'select' && multiple) {
        field.value = (field.value || []) as any;
        field.multiple = true;
      }

      if (type !== 'radio' && type !== 'checkbox' && !!format) {
        if (formatOnBlur === true) {
          if (touchedState === true) {
            field.value = format(field.value, field.name);
          }
        } else {
          field.value = format(field.value, field.name);
        }
      }

      // We incorporate the fact that we know the `name` prop by scoping `onChange`.
      // In addition, to support `parse` fn, we can't just re-use the OG `handleChange`, but
      // instead re-implement it's guts.
      if (type !== 'radio' && type !== 'checkbox') {
        field.onChange = (eventOrValue: React.ChangeEvent<any> | any) => {
          if (isInputEvent(eventOrValue)) {
            if (eventOrValue.persist) {
              eventOrValue.persist();
            }
            setFieldValue(name, parse(getValueFromEvent(eventOrValue, name), field.name));
          } else {
            setFieldValue(name, parse(eventOrValue, field.name));
          }
        };
      }
    }

    return field;
};

/**
 * Get field state from `FormikState`.
 */
export const useFieldMeta = <Value>(name: string): FieldMetaProps<Value> => {
  const [fieldMeta] = useFormikState<any, FieldMetaProps<Value>>(
    useMemo(() => selectFieldMetaByName(name), [name]),
    isShallowEqual
  );

  return fieldMeta;
};

/**
 * Get memoized helpers from `FormikContext`.
 */
export const useFieldHelpers = (name: string): FieldHelperProps<any> => {
  const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
  return useMemo(() => ({
    setValue: (value: any, shouldValidate?: boolean) =>
      setFieldValue(name, value, shouldValidate),
    setTouched: (value: boolean, shouldValidate?: boolean) =>
      setFieldTouched(name, value, shouldValidate),
    setError: (value: any) => setFieldError(name, value),
  }), [name, setFieldValue, setFieldTouched, setFieldError]);
}

const selectInitialValues = <Values>(state: FormikState<Values>) => state.initialValues;
export const useInitialValues = <Values>() => useFormikContext<Values>().useState(selectInitialValues);

const selectInitialTouched = <Values>(state: FormikState<Values>) => state.initialTouched;
export const useInitialTouched = <Values>() => useFormikContext<Values>().useState(selectInitialTouched);

const selectInitialErrors = <Values>(state: FormikState<Values>) => state.initialErrors;
export const useInitialErrors = <Values>() => useFormikContext<Values>().useState(selectInitialErrors);

const selectInitialStatus = (state: FormikState<any>) => state.initialStatus;
export const useInitialStatus = () => useFormikContext().useState(selectInitialStatus);

const selectValues = <Values>(state: FormikState<Values>) => state.values;
export const useValues = <Values>() => useFormikContext<Values>().useState(selectValues);

const selectTouched = <Values>(state: FormikState<Values>) => state.touched;
export const useTouched = <Values>() => useFormikContext<Values>().useState(selectTouched);

const selectErrors = <Values>(state: FormikState<Values>) => state.errors;
export const useErrors = <Values>() => useFormikContext<Values>().useState(selectErrors);

const selectStatus = (state: FormikState<any>) => state.status;
export const useStatus = () => useFormikContext().useState(selectStatus);

const selectIsDirty = (state: FormikState<any>) => state.dirty;
export const useIsDirty = () => useFormikContext().useState(selectIsDirty);

const selectIsValid = (state: FormikState<any>) => state.isValid;
export const useIsValid = () => useFormikContext().useState(selectIsValid);

const selectIsSubmitting = (state: FormikState<any>) => state.isSubmitting;
export const useIsSubmitting = () => useFormikContext().useState(selectIsSubmitting);
