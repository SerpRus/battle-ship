export type TSingleChangeFieldsetProps = {
  label: string;
  defaultValue: string;
  handler: (value: string) => Promise<boolean>;
  placeholder?: string;
  yupSchemaItem: string;
};
