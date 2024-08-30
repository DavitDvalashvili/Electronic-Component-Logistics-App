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

export type pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export interface DeleteBoxProps {
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  name: string;
}

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

export type componentFilterState = {
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  search_term: string;
  page: string;
  setComponentFilter: (
    filterBy: keyof Omit<componentFilterState, "setFilter">,
    value: string
  ) => void;
};

export type OptionItem = {
  [key: string]: string;
};

export type CustomSelectComponentProps = {
  filterComponentBy:
    | "name"
    | "family"
    | "package_type"
    | "nominal_value"
    | "electrical_supply"
    | "suppliers_name";
};

export type CustomSelectDeviceProps = {
  filterDeviceBy: "name" | "electrical_supply" | "size";
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

export type device = {
  id: string;
  name: string;
  purpose: string;
  electrical_supply: string;
  size: string;
  available_quantity: number;
  unit_cost: number;
  images_urls: string;
};

export type deviceState = {
  loading: boolean;
  devices: device[];
  allDevices: device[];
  device: device | null;
  error: string;
  name: string;
  electrical_supply: string;
  size: string;
  search_term: string;
  page: string;
  isUpdate: boolean;
  getDevices: (params: {
    name: string;
    electrical_supply: string;
    size: string;
    search_term: string;
    page: string;
  }) => Promise<void>;
  getAllDevices: () => Promise<void>;
  getDevice: (id: string) => Promise<void>;
  updateDevice: (device: device) => Promise<void>;
  addDevice: (newDevice: device) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
  toggleUpdate: () => void;
};

export type deviceFilterState = {
  name: string;
  electrical_supply: string;
  size: string;
  search_term: string;
  page: string;
  setDeviceFilter: (
    filterBy: keyof Omit<deviceFilterState, "setFilter">,
    value: string
  ) => void;
};
