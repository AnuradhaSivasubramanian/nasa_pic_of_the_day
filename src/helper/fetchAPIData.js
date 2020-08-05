import transformDateForAPIRequest from "./transformDateForAPIRequest";

const NASA_KEY = process.env.REACT_APP_API_KEY;

export function getNASAPictures(startDate, endDate) {
  return new Promise(async (resolve, reject) => {
    try {
      const startDateFormatted = transformDateForAPIRequest(startDate);
      const endDateFormatted = transformDateForAPIRequest(endDate);

      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&start_date=${startDateFormatted}&end_date=${endDateFormatted}`;
      const headers = new Headers({
        "Content-Type": "application/json",
      });

      await fetch(url, {
        method: "GET",
        headers,
      }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.json());
        } else {
          reject(response.json());
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
