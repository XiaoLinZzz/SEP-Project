import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Company, CreateCompanyProps } from "./company.types";

class CompanyModel<
    ModelAttributes = Company,
    ModelCreationAttributes = CreateCompanyProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Company
{
  name!: Company["name"];
  phone: Company["phone"];
  address: Company["address"];
}

modelManager.init(
  "Company",
  CompanyModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "companies",
  }
);

export default CompanyModel;
