export interface IComponent {
  id: string;
  family: string;
  name: string;
  purpose: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: number;
  other_cost: number;
  available_quantity: number;
  storage_cabinet: string;
  storage_drawer: string;
  storage_shelf: string;
  suppliers_name: string;
  suppliers_contact_person: string;
  suppliers_contact_details: string;
  receipt_date: string;
  invoice_number: string;
  images_urls: string;
  data_sheet: string;
}

export interface InitialStateComponent {
  loading: boolean;
  components: IComponent[];
  allComponents: IComponent[];
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
  isUpdate: boolean;
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

export interface IFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}

export interface IComponentDevice {
  id: number;
  device_id: number;
  component_id: number;
  quantity_per_device: number;
}

export interface initialComponentDevice {
  loading: boolean;
  devices: IComponentDevice[];
  error: string;
}
