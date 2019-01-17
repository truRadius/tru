export interface SearchBody {
  body: {
    search_terms: string;
    from: number;
    size: number;
    sort: {
      sort_by: string;
      ascending: boolean;
    };
    filters: {
      geography: {
        zip: string;
        radius: number;
      };
      organization: {
        ntee_major_codes: Array<string>;
      };
    };
  };
}