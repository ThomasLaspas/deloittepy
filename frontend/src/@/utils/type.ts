
export interface TaxData {
    username: string;
    employment_info?: string;
    expenses?: string;
    house_number?: string;
    location?: string;
    married_status?: string;
    salary?: number;
    add_taxes?:boolean
}

export interface RouteError {
    message: string;
    status: number;
    statusText: string;
  }

  export interface Data{
    username: string,
    password: string
  }