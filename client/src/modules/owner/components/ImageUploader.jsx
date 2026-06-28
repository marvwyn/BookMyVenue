import { useRef } from "react";
import { showError } from "../../../shared/utils/toast";

const MAX_FILES = 5;

const ImageUploader = ({
  files,
  setFiles,
}) => {
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const images = Array.from(newFiles);

    if (files.length + images.length > MAX_FILES) {
      showError(
        `You can upload a maximum of ${MAX_FILES} images.`
      );
      return;
    }

    setFiles((prev) => [
      ...prev,
      ...images,
    ]);
  };

  const handleFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();

    addFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-5">

      <div
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={handleDrop}
        onClick={() =>
          inputRef.current.click()
        }
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-10
          text-center
          transition-all
          cursor-pointer

          ${
            files.length >= MAX_FILES
              ? "bg-gray-100 border-gray-200 cursor-not-allowed"
              : "hover:border-red-500 hover:bg-red-50"
          }
        `}
      >

        <div className="text-6xl mb-4">
          📸
        </div>

        <h3 className="text-lg font-semibold">
          Upload Venue Photos
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Drag & Drop images here
        </p>

        <p className="text-sm text-gray-500">
          or click to browse
        </p>

        <p className="text-xs text-gray-400 mt-4">
          JPG, PNG, WEBP
        </p>

        <p className="text-xs text-gray-400">
          Maximum {MAX_FILES} images
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          disabled={
            files.length >= MAX_FILES
          }
          onChange={handleFileChange}
        />

      </div>

      <div className="text-sm text-gray-500">
        {files.length}/{MAX_FILES} selected
      </div>

      {files.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {files.map((file, index) => (

            <div
              key={index}
              className="relative rounded-2xl overflow-hidden border bg-white shadow-sm"
            >

              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(index)
                }
                className="
                  absolute
                  top-2
                  right-2
                  w-8
                  h-8
                  rounded-full
                  bg-white
                  shadow
                  hover:bg-red-600
                  hover:text-white
                  transition
                "
              >
                ✕
              </button>

              <div className="p-3">

                <p className="text-sm font-medium truncate">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ImageUploader;