import { CustomError } from "../errors";
import { Order } from "sequelize";

export const getSortingParams = (sort: string) => {
  // sort=Client.firstName:ASC
  const allowedSortOrder = ["DESC", "ASC"];
  const subStrings = sort ? sort.split(":") : ["updated", "DESC"]; // ["Client.firstName", "ASC"]
  const nestedModal = subStrings[0] && subStrings[0].split("."); // ["Client", "firstName"]

  if (subStrings.length === 2 && allowedSortOrder.includes(subStrings[1])) {
    if (nestedModal.length && nestedModal.length > 1) {
      subStrings.unshift(nestedModal[0]);
      subStrings[1] = nestedModal[1]; //  [ 'Client', 'firstName', 'ASC' ]
    }
    return [subStrings] as Order;
  }

  throw new CustomError(400, "INVALID_SORT_PARAM");
};
