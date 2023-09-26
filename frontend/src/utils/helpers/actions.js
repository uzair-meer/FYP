import { toast } from "react-toastify";

export default async function downloadFile(
  imageSrc,
  nameOfDownload = "my-image.png",
) {
  const response = await fetch(imageSrc);

  const blobImage = await response.blob();

  const href = URL.createObjectURL(blobImage);

  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}

export const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem("state", serializedData);
  } catch (e) {
    return undefined;
  }
};

export const handleResponse = (promise) => {
  return promise
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.message);
      throw error; // Re-throw the error for the caller to handle
    });
};
