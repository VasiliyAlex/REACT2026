export function fileToBase64(
  file: File,
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(
          reader.result as string,
        );
      };

      reader.onerror = () => {
        reject(
          new Error(
            'Failed to convert file',
          ),
        );
      };

      reader.readAsDataURL(file);
    },
  );
}