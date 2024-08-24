export interface IComponent {
  id: string;
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
  invoice: string;
  images_urls: string;
  data_sheet: string;
}

export interface InitialStateComponent {
  loading: boolean;
  components: IComponent[];
  component: IComponent | null;
  error: string;
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  search_term: string;
  page: string;
}

export interface CustomSelectProps {
  filterBy: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface DeleteBoxProps {
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  name: string;
}
