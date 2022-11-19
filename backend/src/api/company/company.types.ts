import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Company extends DefaultSchemaConfig {
  name: string;
  phone?: string;
  address?: string;
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateMyCompanyProps extends CreateCompanyProps {
  company: Company["id"];
  phone: string;
  address: string;
}

export interface GetMyCompanyProps {
  company: Company["id"];
}
