import { useState, useRef, useEffect } from "react";
import { imageCaptureDevice } from "../../type";
import { useUploadStore } from "../../store/upload";
import { useDeviceStore } from "../../store/deviceStore";

const CameraCapture = ({
  setShowCameraCapture,
  device,
}: imageCaptureDevice) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { uploadImage, updateImage } = useUploadStore();
  const { getDevice } = useDeviceStore();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const upload = async () => {
    if (!image) return;

    // Convert base64 to File object
    const file = dataURLtoFile(image, "captured-image.png");

    // Convert File object to FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const fileList = dataTransfer.files;

    const response = await uploadImage(fileList);
    await update(response);
  };

  const update = async (imageUrl: string) => {
    try {
      // Update component with new image URLs
      if (device) {
        await updateImage({
          images_urls: imageUrl,
          component_id: null,
          device_id: device.id,
        });
        stopCamera();
        setShowCameraCapture(false);
      }
      await getDevice(`${device.id}`);
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);

    // Check if mimeMatch is not null
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error("Invalid data URL format");
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  const takePicture = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && videoRef.current && canvas) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setImage(dataUrl);
    }
  };

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md text-lg">
      <video
        ref={videoRef}
        width="650"
        height="500"
        className={`${image ? "hidden" : "block"} border-[0.5px border-white`}
      ></video>
      <canvas
        ref={canvasRef}
        width="650"
        height="487.5"
        className={`${image ? "block" : "hidden"} border-[0.5px border-white `}
      ></canvas>
      <div className="mt-5 flex justify-center gap-5">
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 bg-NorthAtlanticBreeze"
          onClick={() => {
            if (!image) {
              takePicture();
            } else {
              setImage(null);
            }
          }}
        >
          {image ? "ხელახლა ცდა" : "ფოტოს გადაღება"}
        </button>
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 bg-green"
          onClick={() => {
            upload();
          }}
        >
          შენახვა
        </button>
        <button
          onClick={() => {
            stopCamera();
            setShowCameraCapture(false);
          }}
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 bg-ChinChinCherry"
        >
          დახურვა
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
