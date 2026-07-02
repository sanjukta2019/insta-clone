const CLOUD_NAME = "pqxcyldb";
const UPLOAD_PRESET = "instagram_clone";

export const uploadToCloudinary = async (image) => {
	const formData = new FormData();

	formData.append("file", image);
	formData.append("upload_preset", UPLOAD_PRESET);

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
		{
			method: "POST",
			body: formData,
		}
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error.message);
	}

	return {
  secure_url: data.secure_url,
  public_id: data.public_id,
};
};




























// const CLOUD_NAME = "pqxcyldb";
// const UPLOAD_PRESET = "instagram_clone";

// export const uploadToCloudinary = async (file) => {
//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append("upload_preset", UPLOAD_PRESET);

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error?.message || "Upload failed");
//   }

//   return data.secure_url;
// };