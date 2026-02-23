export const baseURL = "http://64.23.166.88:5649";

export const FireAPI = async (
  endPoint,
  method = "GET",
  body = null,
  customheaders = {},
) => {
  const url = `${baseURL}/${endPoint}`;

  const headers = {
    "content-type": "application/json",
    ...customheaders,
  };

  const options = {
    method,
    headers,
  };
  if (body && method.toUpperCase() !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const isNoContent = response.status === 204;
    const data = isNoContent ? null : response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data || { message: "Something went wrong" });
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
