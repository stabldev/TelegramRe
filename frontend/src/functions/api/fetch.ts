export const fetchAPI = async (url: string, options: RequestInit = {}) => {
	const res = await fetch(url, options);
	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || "An error occured");
	return data;
};
