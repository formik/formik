import * as React from 'react';

import { connect } from './connect';
import {
  FormikProps,
  GenericFieldHTMLAttributes,
  FormikContext,
  FormikHandlers,
} from './types';
import warning from 'tiny-warning';
import { getIn, isEmptyChildren, isFunction } from './utils';

/**
 * Note: These typings could be more restrictive, but then it would limit the
 * reusability of custom <Field/> components.
 *
 * @example
 * interface MyProps {
 *   ...
 * }
 *
 * export const MyInput: React.SFC<MyProps & FieldProps> = ({
 *   field,
 *   form,
 *   ...props
 * }) =>
 *   <div>
 *     <input {...field} {...props}/>
 *     {form.touched[field.name] && form.errors[field.name]}
 *   </div>
 */
export interface FieldProps<Values = any, ValueType = any> {
  field: {
    /** Classic React change handler, keyed by input name */
    onChange: FormikHandlers['handleChange'];
    /** Mark input as touched */
    onBlur: FormikHandlers['handleBlur'];
    /** Value of the input */
    value: ValueType;
    /* name of the input */
    name: string;
  };
  form: FormikProps<Values>; // if ppl want to restrict this for a given form, let them.
}

export interface FieldConfig<Values = any, ValueType = any> {
  /**
   * Field component to render. Can either be a string like 'select' or a component.
   */
  component?:
    | string
    | React.ComponentType<FieldProps<Values, ValueType>>
    | React.ComponentType<void>;

  /**
   * Render prop (works like React router's <Route render={props =>} />)
   */
  render?: ((props: FieldProps<Values, ValueType>) => React.ReactNode);

  /**
   * Children render function <Field name>{props => ...}</Field>)
   */
  children?:
    | ((props: FieldProps<Values, ValueType>) => React.ReactNode)
    | React.ReactNode;

  /**
   * Validate a single field value independently
   */
  validate?: ((value: ValueType) => string | Promise<void> | undefined);

  /**
   * Field name
   */
  name: string;

  /** HTML input type */
  type?: string;

  /** Field value */
  value?: ValueType;

  /** Inner ref */
  innerRef?: (instance: any) => void;
}

export type FieldAttributes<
  Props,
  Values,
  ValueType = any
> = GenericFieldHTMLAttributes & FieldConfig<Values, ValueType> & Props;

type FieldInnerProps<Props, Values, ValueType = any> = FieldAttributes<
  Props,
  Values,
  ValueType
> & { formik: FormikContext<Values> };

/**
 * Custom Field component for quickly hooking into Formik
 * context and wiring up forms.
 */
class FieldInner<
  Values = {},
  Props = {},
  ValueType = any
> extends React.Component<FieldInnerProps<Props, Values, ValueType>, {}> {
  constructor(props: FieldInnerProps<Props, Values, ValueType>) {
    super(props);
    const { render, children, component } = props;
    warning(
      !(component && render),
      'You should not use <Field component> and <Field render> in the same <Field> component; <Field component> will be ignored'
    );

    warning(
      !(component && children && isFunction(children)),
      'You should not use <Field component> and <Field children> as a function in the same <Field> component; <Field component> will be ignored.'
    );

    warning(
      !(render && children && !isEmptyChildren(children)),
      'You should not use <Field render> and <Field children> in the same <Field> component; <Field children> will be ignored'
    );
  }

  componentDidMount() {
    // Register the Field with the parent Formik. Parent will cycle through
    // registered Field's validate fns right prior to submit
    this.props.formik.registerField(this.props.name, this);
  }

  componentDidUpdate(prevProps: FieldInnerProps<Props, Values, ValueType>) {
    if (this.props.name !== prevProps.name) {
      this.props.formik.unregisterField(prevProps.name);
      this.props.formik.registerField(this.props.name, this);
    }

    if (this.props.validate !== prevProps.validate) {
      this.props.formik.registerField(this.props.name, this);
    }
  }

  componentWillUnmount() {
    this.props.formik.unregisterField(this.props.name);
  }

  render() {
    const {
      validate,
      name,
      render,
      children,
      component = 'input',
      formik,
      ...props
    } = this.props;
    const {
      validate: _validate,
      validationSchema: _validationSchema,
      ...restOfFormik
    } = formik;
    const field = {
      value:
        props.type === 'radio' || props.type === 'checkbox'
          ? props.value // React uses checked={} for these inputs
          : getIn(formik.values, name),
      name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    };
    const bag = { field, form: restOfFormik };

    if (render) {
      return render(bag);
    }

    if (isFunction(children)) {
      return (children as (
        props: FieldProps<Values, ValueType>
      ) => React.ReactNode)(bag);
    }

    if (typeof component === 'string') {
      const { innerRef, ...rest } = props;
      return React.createElement(component as any, {
        ref: innerRef,
        ...field,
        ...rest,
        children,
      });
    }

    return React.createElement(component as any, {
      ...bag,
      ...props,
      children,
    });
  }
}

export const Field = connect<FieldAttributes<any, any>, any>(FieldInner);

export type TypedAttributes<Values, ValueType> = Partial<
  Pick<
    FieldAttributes<{}, Values, ValueType>,
    Exclude<keyof FieldAttributes<{}, Values, ValueType>, 'name'>
  >
>;

export type WrapFieldFunction<
  FormValues,
  Parent,
  Values,
  Key extends keyof Values
> = (
  parent: Parent
) => React.ComponentType<TypedAttributes<FormValues, Values[Key]>>;

export interface FieldDefinition<FormValues, ValueType> {
  _parent?: FieldDefinition<FormValues, any>;
  _key?: string;
  _field: ValueType extends object
    ? React.ComponentType<never>
    : React.ComponentType<TypedAttributes<FormValues, ValueType>>;
}

export type TypedFieldProxy<FormValues, Values = FormValues> = {
  [fieldName in keyof Values]: Values[fieldName] extends (infer FieldType)[]
    ? TypedFieldProxy<FormValues, FieldType>[]
    : Values[fieldName] extends object
      ? TypedFieldProxy<FormValues, Values[fieldName]>
      : FieldDefinition<FormValues, Values[fieldName]>
} &
  FieldDefinition<FormValues, any>;

const wrapField = <FormValues, Values, Name extends keyof Values>(
  key: Name,
  parent?: FieldDefinition<FormValues, any>
) => {
  let suffix: string = '';
  let lastKey: string = key as string;

  while (parent && typeof parent._key !== 'undefined') {
    if (lastKey) {
      suffix = `[${lastKey}]${suffix}`;
    }

    lastKey = parent._key;
    parent = parent._parent;
  }

  return (props: TypedAttributes<FormValues, Values[Name]>) => {
    return <Field name={`${lastKey}${suffix}`} {...props} />;
  };
};

export const typedFieldProxy = <FormValues, Values = FormValues>(
  // the originating Proxy is never going to return its parent, but _field is required
  parent: FieldDefinition<FormValues, any> = {} as any
) => {
  return new Proxy(parent as TypedFieldProxy<FormValues, Values>, {
    get: (
      target,
      key: keyof Values | keyof FieldDefinition<FormValues, any>
    ) => {
      if (key === '_field' || key === '_key' || key === '_parent') {
        key = key as keyof FieldDefinition<FormValues, any>;

        if (parent) {
          return parent[key];
        }
      } else {
        key = key as keyof Values;

        if (!(key in target)) {
          target[key] = typedFieldProxy<FormValues, Values[typeof key]>({
            _parent: target,
            _key: key as string,
            _field: wrapField<FormValues, Values, typeof key>(key, parent),
          }) as any;
        }
      }

      return target[key];
    },
  });
};
