import React from 'react';
import { Cars, getCars } from './api/getCars';

function App() {
  const [cars, setCars] = React.useState<Cars[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const carsInfo = async () => {
      try {
        const data = await getCars();
        setCars(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    carsInfo();
  }, []);
  console.log(cars);
  return <></>;
}

export default App;
