import { omit as _omit } from "lodash";

import CompanyModel from "./company.model";
import {
  CreateCompanyProps,
  UpdateMyCompanyProps,
  GetMyCompanyProps,
} from "./company.types";
import { CustomError } from "../../components/errors";
import CompanyErrorCode from "./company.error";

class CompanyService {
  async createCompany(props: CreateCompanyProps) {
    const company = await CompanyModel.create(props);

    return company;
  }

  async updateCompany(props: UpdateMyCompanyProps) {
    // Props
    const { company } = props;
    const updateProps = _omit(props, ["company"]);

    // Check if company exists
    const exsitingCompany = await CompanyModel.findOne({
      where: { id: company },
    });

    // If not, then throw an error
    if (!exsitingCompany) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }

    // Update company by passing given props
    const [, [updatedCompany]] = await CompanyModel.update(updateProps, {
      where: { id: company },
      returning: true,
    });

    return updatedCompany;
  }

  async getCompanyById(props: GetMyCompanyProps) {
    // Find company by id
    const company = await CompanyModel.findOne({
      where: { id: props.company },
    });

    // If no company has been found, then throw an error
    if (!company) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }

    return company;
  }
}

export default new CompanyService();
