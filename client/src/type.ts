export type component = {
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
};

export type initialStateComponent = {
  loading: boolean;
  components: component[];
  allComponents: component[];
  component: component | null;
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
};

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

/////////////////////////// from here

export type componentDevice = {
  device_name: string;
  component_count_per_device: number;
  component_available_quantity: number;
};

export type ComponentDeviceState = {
  loading: boolean;
  devices: componentDevice[];
  error: string;
  getDevices: (id: string) => Promise<void>;
};

type FilterKey =
  | "name"
  | "family"
  | "package_type"
  | "nominal_value"
  | "electrical_supply"
  | "suppliers_name";

export type filterState = {
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  search_term: string;
  page: string;
  setFilter: (
    filterBy: keyof Omit<filterState, "setFilter">,
    value: string
  ) => void;
};

export type OptionItem = {
  [key: string]: string;
};

export type CustomSelectProps = {
  filterBy: FilterKey;
};

// Define the Zustand store
export type componentState = {
  loading: boolean;
  components: component[];
  allComponents: component[];
  component: component | null;
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
  getComponents: (params: {
    name: string;
    family: string;
    package_type: string;
    nominal_value: string;
    electrical_supply: string;
    suppliers_name: string;
    search_term: string;
    page: string;
  }) => Promise<void>;
  getAllComponents: () => Promise<void>;
  getComponent: (id: string) => Promise<void>;
  updateComponent: (component: component) => Promise<void>;
  addComponent: (newComponent: component) => Promise<void>;
  deleteComponent: (id: string) => Promise<void>;
  toggleUpdate: () => void;
};

export type formProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
};

export type updateQuantityBoxProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleClick: () => void;
  componentName: string;
};

export type buttonBoxProps = {
  currentComponent: component;
};
