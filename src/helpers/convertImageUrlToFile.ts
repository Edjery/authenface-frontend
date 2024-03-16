const convertImageUrlToFile = (imageUrl: string): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.open("GET", imageUrl);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const file = new File([xhr.response], "image.png", {
          type: "image/png",
        });
        resolve(file);
      } else {
        reject(new Error("Failed to fetch image"));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network error"));
    };
    xhr.send();
  });
};

export default convertImageUrlToFile;
