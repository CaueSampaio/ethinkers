export const parseToRcFormField = (data) =>
  Object.keys(data).reduce(
    (prev, current) => ({
      ...prev,
      [current]: { value: data[current] },
    }),
    {},
  );

export default (props, changedFields) => {
  props.updateFormData(changedFields);
};
