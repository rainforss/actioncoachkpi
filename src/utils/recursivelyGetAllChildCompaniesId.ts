import { actionCoachUser } from "../webApis/actionCoachUser";

export const recursivelyGetAllChildCompanies: any = async (
  companies: string[],
  parentComapnyIds: any[],
  accessToken: string
) => {
  const result = await actionCoachUser(
    accessToken
  ).getChildCompaniesByParentCompanyIds(parentComapnyIds);
  const childCompanyIds: string[] = [];
  result.value.forEach((company: any) => {
    companies.push(company.ac_actioncoachpartnercompanyid);
    childCompanyIds.push(company.ac_actioncoachpartnercompanyid);
  });
  if (childCompanyIds.length !== 0) {
    return await recursivelyGetAllChildCompanies(
      companies,
      childCompanyIds,
      accessToken
    );
  }
  return companies;
};
