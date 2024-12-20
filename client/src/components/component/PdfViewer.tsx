import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useComponentStore } from "../../store/componentStore";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

const PdfViewer = () => {
  // Initialize PDF viewer plugins
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const getFilePluginInstance = getFilePlugin();
  const scrollModePluginInstance = scrollModePlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { component } = useComponentStore();

  // Return early if data_sheet is not available
  if (!component?.data_sheet) return;

  return (
    <div className="h-[780px] mx-auto max-w-6xl border border-gray-300 rounded-lg shadow-md">
      <Viewer
        fileUrl={`${Api_Url}${component?.data_sheet}`}
        plugins={[
          pageNavigationPluginInstance,
          getFilePluginInstance,
          scrollModePluginInstance,
          defaultLayoutPluginInstance,
        ]}
      />
    </div>
  );
};

export default PdfViewer;
