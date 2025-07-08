// // @ts-ignore
// import { RNS3 } from "react-native-aws3";

// const keyId = "0052639d4143d620000000001";
// const keyName = "looper";
// const applicationKey = "K005yBOTkNNWMAhlr/coO0MCP141OKI";
// const bucketId = "e2769359cd84c1f4937d0612";
// const bucketName = "Looper";
// const region = "us-east-005";

// const uploadToBackblaze = async (file: any) => {
//   const options = {
//     keyPrefix: "", // folder path inside the bucket, if any
//     bucket: bucketName,
//     region: region, // match your endpoint
//     accessKey: keyId,
//     secretKey: applicationKey,
//     successActionStatus: 201,
//     endpoint: `https://s3.${region}.backblazeb2.com`, // exact Backblaze endpoint
//   };

//   return RNS3.put(file, options)
//     .then((response: any) => {
//       if (response.status !== 201) {
//         throw new Error("Failed to upload");
//       }
//       console.log("Upload success:", response.body);
//       return response.body.fileId;
//     })
//     .catch((error: any) => {
//       console.error("Upload error:", error);
//     });
// };

// export { uploadToBackblaze };

const B2_ACCOUNT_ID = "0052639d4143d620000000001";
const B2_APPLICATION_KEY = "K005yBOTkNNWMAhlr/coO0MCP141OKI";
const B2_BUCKET_ID = "e2769359cd84c1f4937d0612";

// Get authorization token and API URL
const getAuthorizationToken = async () => {
  const credentials = B2_ACCOUNT_ID + ":" + B2_APPLICATION_KEY;
  const base64Credentials = btoa(credentials);

  try {
    console.log("Attempting to authorize with B2...");
    const response = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Authorization Response:", data);
      throw new Error(`Authorization failed: ${JSON.stringify(data)}`);
    }

    console.log("Authorization successful, got API URL:", data.apiUrl);
    return {
      authorizationToken: data.authorizationToken,
      apiUrl: data.apiUrl,
      downloadUrl: data.downloadUrl,
    };
  } catch (error) {
    console.error("Detailed auth error:", error);
    throw error;
  }
};

// Get upload URL
const getUploadUrl = async (authToken: string, apiUrl: string) => {
  try {
    console.log("Getting upload URL from:", apiUrl);
    console.log("Using bucket ID:", B2_BUCKET_ID);

    const response = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketId: B2_BUCKET_ID,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Upload URL Response:", data);
      throw new Error(`Failed to get upload URL: ${JSON.stringify(data)}`);
    }

    console.log("Successfully got upload URL");
    return {
      uploadUrl: data.uploadUrl,
      authorizationToken: data.authorizationToken,
    };
  } catch (error) {
    console.error("Detailed upload URL error:", error);
    throw error;
  }
};

// Get download authorization
const getDownloadAuthorization = async (
  authToken: string,
  apiUrl: string,
  fileName: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/b2api/v2/b2_get_download_authorization`,
      {
        method: "POST",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucketId: B2_BUCKET_ID,
          fileNamePrefix: fileName,
          validDurationInSeconds: 604800, // 7 days
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Failed to get download authorization: ${JSON.stringify(data)}`
      );
    }

    return data.authorizationToken;
  } catch (error) {
    console.error("Error getting download authorization:", error);
    throw error;
  }
};

// Upload file to B2
export const uploadImageToB2 = async (file: any, fileName: string) => {
  console.log("Uploading image to B2:", file, fileName);
  try {
    // Get authorization token and API URL
    const { authorizationToken, apiUrl, downloadUrl } =
      await getAuthorizationToken();
    console.log("Download URL from auth:", downloadUrl);

    // Get upload URL
    const { uploadUrl, authorizationToken: uploadAuthToken } =
      await getUploadUrl(authorizationToken, apiUrl);

    // Convert file to blob
    const response = await fetch(file.uri);
    const blob = await response.blob();

    // Create a proper file path with the images folder
    // Remove any leading slashes and ensure proper folder structure
    const cleanFileName = fileName.replace(/^\/+/, "");
    const filePath = cleanFileName.startsWith("images/")
      ? cleanFileName
      : `images/${cleanFileName}`;

    console.log("Uploading file with path:", filePath);

    // Upload file
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: uploadAuthToken,
        "Content-Type": file?.type || "application/octet-stream",
        "Content-Length": file?.size?.toString() || "0",
        "X-Bz-File-Name": filePath, // Use the proper file path here
        "X-Bz-Content-Sha1": "do_not_verify",
      },
      body: blob,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`Upload failed: ${errorData.message || "Unknown error"}`);
    }

    const uploadData = await uploadResponse.json();
    console.log("Upload response data:", uploadData);

    // Get download authorization
    const downloadAuthToken = await getDownloadAuthorization(
      authorizationToken,
      apiUrl,
      filePath
    );

    // Use the Friendly URL format with authorization
    const fileUrl = `https://f005.backblazeb2.com/file/Looper/${filePath}`;

    console.log("Generated file URL:", fileUrl);
    console.log("Authorization Token:", downloadAuthToken);

    // For private buckets, we need to include the authorization token in the headers
    // rather than as a URL parameter
    return {
      success: true,
      fileId: uploadData.fileId,
      fileName: filePath,
      fileUrl,
      authToken: downloadAuthToken, // Include the auth token separately
    };
  } catch (error: any) {
    console.error("Error uploading to B2:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Generic function to upload any file to Backblaze B2 public bucket
 * @param {Object} file - The file object with uri, type, and size
 * @returns {Object} - Result of the upload operation
 */
export const uploadToB2 = async (file: any) => {
  try {
    console.log("Starting upload process with file:", file.uri);

    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.uri.split(".").pop() || "jpg";
    const generatedFileName = `${timestamp}-${Math.floor(
      Math.random() * 10000
    )}.${fileExtension}`;

    // Create a proper file path with the images folder
    const filePath = `images/${generatedFileName}`;
    console.log("Generated file path:", filePath);

    // Get authorization token and API URL for uploading
    const { authorizationToken, apiUrl } = await getAuthorizationToken();

    // Get upload URL
    const { uploadUrl, authorizationToken: uploadAuthToken } =
      await getUploadUrl(authorizationToken, apiUrl);

    // Convert file to blob with error handling
    console.log("Fetching file from URI:", file.uri);
    let blob;
    try {
      const response = await fetch(file.uri);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch file: ${response.status} ${response.statusText}`
        );
      }
      blob = await response.blob();
      console.log("Successfully converted file to blob, size:", blob.size);
    } catch (blobError: any) {
      console.error("Error converting file to blob:", blobError);
      throw new Error(`File conversion failed: ${blobError.message}`);
    }

    // Upload file
    console.log("Uploading to:", uploadUrl);
    try {
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: uploadAuthToken,
          "Content-Type": file.type || "application/octet-stream",
          "Content-Length": String(blob.size || 0),
          "X-Bz-File-Name": encodeURIComponent(filePath),
          "X-Bz-Content-Sha1": "do_not_verify",
        },
        body: blob,
      });

      if (!uploadResponse.ok) {
        let errorData: any = { message: "Unknown error" };
        try {
          errorData = await uploadResponse.json();
        } catch (e: any) {
          errorData = { message: uploadResponse.statusText };
        }
        throw new Error(
          `Upload failed (${uploadResponse.status}): ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const uploadData = await uploadResponse.json();
      console.log("Upload successful:", uploadData.fileName);

      // For public bucket, create direct public URL
      const fileUrl = `https://f005.backblazeb2.com/file/doodhwaley/${encodeURIComponent(
        filePath
      )}`;

      return {
        success: true,
        fileId: uploadData.fileId,
        fileName: filePath,
        fileUrl: fileUrl,
      };
    } catch (uploadError: any) {
      console.error("Upload request failed:", uploadError);
      throw new Error(`File upload request failed: ${uploadError.message}`);
    }
  } catch (error: any) {
    console.error("Error in uploadToB2:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Example usage:
/*
// Simple example: Just pass any file object with a uri
const handleImageUpload = async (imageUri) => {
  // Create a simple file object
  const file = {
    uri: imageUri,
    // Optional: type and size will be determined by the function if not provided
    type: 'image/jpeg', 
    size: 0
  };
  
  const result = await uploadToB2(file);
  
  if (result.success) {
    console.log('Image uploaded successfully:', result.fileUrl);
    // The result contains:
    // - fileUrl: The public URL to access the file
    // - fileName: The full path including the images/ prefix
    // - fileId: The unique ID assigned by Backblaze
    return result.fileUrl; // Use the URL in your app
  } else {
    console.error('Upload failed:', result.error);
    return null;
  }
};
*/
