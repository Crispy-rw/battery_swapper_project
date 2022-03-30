import _ from "lodash";

export default (arrayValues, iteratee) => {
  return _.map(arrayValues, _.iteratee(iteratee));
};
