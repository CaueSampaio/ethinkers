export const parseToRcFormField = (data) =>
  Object.keys(data).reduce(
    (prev, current) => ({
      ...prev,
      [current]: { value: data[current] },
    }),
    {},
  );

export default (props, changedFields) => {
  console.log(props, changedFields);
  props.updateFormData(changedFields);
};
