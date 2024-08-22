export interface IComponent {
  id: number;
  family: string;
  name: string;
  purpose: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: number;
  available_quantity: number;
  storage_cabinet: number;
  storage_drawer: number;
  storage_shelf: number;
  suppliers_name: string;
  suppliers_contact_person: string;
  suppliers_contact_details: string;
  receipt_date: string;
  images_urls: string[];
  data_sheet: string;
}

export interface InitialStateComponent {
  loading: boolean;
  components: IComponent[];
  error: string;
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  search_term: string;
}

export interface CustomSelectProps {
  filterBy: string;
}
