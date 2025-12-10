export interface PotentialIssue {
  id: string;
  title: string;
  dispute_type: string;
  supporting_text: string;
  legal_bases: string[];
  selected: boolean;
}

export type PotentialIssues = PotentialIssue[];
