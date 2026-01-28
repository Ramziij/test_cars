import { carsMock } from './cars.mock';
import { type Cars } from './cars.mock';

// const url = 'https://test.tspb.su/test-task/vehicles';

export async function getCars(): Promise<Cars[]> {
  try {
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(`Error fetching data: ${response.statusText}`);
    // }
    // const data: Cars[] = await response.json();
    // return data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(carsMock);
      }, 500);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
