const _ = require("lodash");

const getObjectWithSelectedProps = (obj, selectedProps) => {
  const subset = _.pick(obj, selectedProps);
  return subset;
};

export default getObjectWithSelectedProps;
