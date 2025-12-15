export interface LegalReference {
  dispute_type: string;
  sections: LegalReferenceSection[];
}

export interface LegalReferenceSection {
  id: string;
  section_name: string;
  brief_description_of_section: string;
  authority: string;
  key_points: string[];
  selected: boolean;
}
