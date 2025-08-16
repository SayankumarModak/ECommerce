import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadImageUrl,
  isEditedMode,
  setUploadImageUrl,
  imageLoadingState,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    //  console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("selectedFile", selectedFile);
      setImageFile(selectedFile);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    console.log("droppedFile", droppedFile);
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleRemoveImage() {
    setImageFile(null);
    //  or we can see the prev name
    if (inputRef.current) {
      console.log(inputRef.current);
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );

    console.log(response, "response");

    if (response?.data?.success) {
      // console.log("response.data.result.url", response.data.result.url);
      setUploadImageUrl(response.data.result.url);
      // imageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile != null) uploadImageToCloudinary();
  }, [imageFile]);

  console.log(uploadImageUrl);

  return (
    <div className="w-full mx-w-md px-6">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`${
          isEditedMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
        onDrag={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* handle state from parent component */}
        <Input
          id="image-upload"
          type="file"
          //  className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditedMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditedMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="text-primary mr-2 h-7 w-7" />
              {/* here some changes in the css */}
              <p className="text-sm font-medium mt-7 items-center flex mb-6">
                {imageFile.name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove Files</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
