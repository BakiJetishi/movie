export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = fetch(url);
    const res = await fetchPro
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};