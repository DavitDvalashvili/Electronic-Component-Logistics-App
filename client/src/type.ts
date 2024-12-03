import { Control, FieldValues } from "react-hook-form";

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
  default_image: string;
  data_sheet: string;
  images: image[];
};

export type image = {
  image_url: string;
  image_id: string;
};

export type imageState = {
  images: image[];
  updateImage: (imageData: imageDataType) => Promise<void>;
  uploadImage: (files: FileList) => Promise<string>;
  deleteImage: (id: string) => Promise<void>;
  uploadPDF: (file: File) => Promise<string>;
};

export type swiperWrapperProps = {
  images: image[];
  id: string;
  type: string;
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

export type deviceComponent = {
  component_name: string;
  component_count_per_device: number;
  component_available_quantity: number;
  device_component_id: string;
};

export type ComponentDeviceState = {
  loading: boolean;
  devices: componentDevice[];
  components: deviceComponent[];
  names: string[];
  deviceComponents: deviceComponentItem[];
  error: string;
  getDevices: (id: string) => Promise<void>;
  getComponents: (id: string) => Promise<void>;
  getComponentsNames: () => Promise<void>;
  addDeviceComponent: (
    newComponentDevice: deviceComponentItem
  ) => Promise<void>;
  deleteComponent: (id: string) => Promise<void>;
};

type deviceComponentItem = {
  component_id: number;
  device_id: number;
  quantity_per_device: number;
  device_component_id?: string;
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

export type option = {
  value: string;
  label: string;
};

export type CustomSelectComponentProps = {
  placeholder: string;
  filterComponentBy:
    | "name"
    | "family"
    | "package_type"
    | "nominal_value"
    | "electrical_supply"
    | "suppliers_name";
};

export type CustomSelectDeviceProps = {
  placeholder: string;
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
  name: string;
};

export type buttonBoxProps = {
  currentComponent: component;
};

export type buttonBox = {
  currentDevice: device;
};

export type device = {
  id: string;
  name: string;
  purpose: string;
  electrical_supply: string;
  size: string;
  available_quantity: number;
  unit_cost: number;
  default_image: string;
  images: image[];
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
  showSideBar: boolean;
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
  toggleShowSideBar: () => void;
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

export type calculatorProps = {
  setShowCalculator: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AddComponentProps = {
  setShowAddDevice: React.Dispatch<React.SetStateAction<boolean>>;
};

export type notFoundProps = {
  name: string;
};

export type imageCaptureComponent = {
  setShowCameraCapture: React.Dispatch<React.SetStateAction<boolean>>;
  component: component;
};

export type imageCaptureDevice = {
  setShowCameraCapture: React.Dispatch<React.SetStateAction<boolean>>;
  device: device;
};

export type imageReview = {
  setImageReview: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrls: string;
  component: component;
};

export type imageReviewDevice = {
  setImageReview: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrls: string;
  device: device;
};

export type GeorgianDatePickerProps<T extends FieldValues> = {
  name: string;
  control: Control<T>;
};

export type imageDataType = {
  images_urls: string;
  component_id: string | null;
  device_id: string | null;
};
