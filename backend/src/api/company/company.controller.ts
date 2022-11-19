import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import companyService from "./company.service";

class CompanyController {
  async updateMyCompany(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const company = await companyService.updateCompany(props);
    res.status(200).json(company);
  }

  async getMyCompany(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const company = await companyService.getCompanyById(props);
    res.status(200).json(company);
  }
}

export default new CompanyController();
