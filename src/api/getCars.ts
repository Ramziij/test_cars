export interface Cars {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

const url = 'https://test.tspb.su/test-task/vehicles';

export async function getCars(): Promise<Cars[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: Cars[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
