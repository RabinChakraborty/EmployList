export const fetchData = async () => {
  try {
    const response = await fetch(
      'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
