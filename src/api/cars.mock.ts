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

export const carsMock: Cars[] = [
  {
    id: 1,
    name: 'Toyota',
    model: 'Camry',
    year: 2020,
    color: 'black',
    price: 25000,
    latitude: 59.9311,
    longitude: 30.3609,
  },
  {
    id: 2,
    name: 'BMW',
    model: 'X5',
    year: 2019,
    color: 'white',
    price: 42000,
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    id: 3,
    name: 'Toyota',
    model: 'Rav4',
    year: 2015,
    color: 'white',
    price: 32000,
    latitude: 51.7558,
    longitude: 31.6173,
  },
  {
    id: 4,
    name: 'Toyota',
    model: 'Corolla',
    year: 2011,
    color: 'white',
    price: 12000,
    latitude: 31.7558,
    longitude: 21.6173,
  },
];
