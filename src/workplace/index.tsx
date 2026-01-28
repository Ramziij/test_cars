import React from 'react';
import { getCars } from '../api/getCars';
import CardUnstyled from '../components/CardUnstyled/CardUnstyled';
import Modal from '../components/Modal';
import Form from '../components/Form';
import Map, { Markers } from '../components/Map';
import type { Cars } from '../api/cars.mock';

const translateSelectedCriteria = (value: string) => {
  switch (value) {
    case 'year-asc':
      return 'Год (по возрастанию)';
    case 'year-desc':
      return 'Год (по убыванию)';
    case 'price-asc':
      return 'Цена (по возрастанию)';
    case 'price-desc':
      return 'Цена (по убыванию)';
    default:
      return '';
  }
};

export default function MainPage() {
  const [cars, setCars] = React.useState<Cars[]>([]);
  const [dataForMap, setDataForMap] = React.useState<Markers[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [sort, setSort] = React.useState<string>('year-asc');
  const [currentCar, setCurrentCar] = React.useState<Cars | null>(null);

  React.useEffect(() => {
    const carsInfo = async () => {
      try {
        const data = await getCars();
        const dataForMap = data.map((c) => {
          const markers: Markers = {
            lat: c.latitude,
            lon: c.longitude,
            name: c.name,
          };
          return markers;
        });

        setDataForMap(dataForMap);
        setCars(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    carsInfo();
  }, []);

  const handleSortChange = (criteria: string) => {
    setSort(criteria);
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
  };

  const sortedVehicles = [...cars].sort((a, b) => {
    const [criteria, order] = sort.split('-');
    let comparison = 0;

    if (criteria === 'year') {
      comparison = a.year - b.year;
    } else if (criteria === 'price') {
      comparison = a.price - b.price;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  const handleSaveClick = () => {
    if (currentCar) {
      setCars(cars.map((car) => (car.id === currentCar.id ? currentCar : car)));
    }
    setCurrentCar(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCar({ ...(currentCar as Cars), [name]: value });
  };

  const handleDeleteClick = (carId: number) => {
    setCars(cars.filter((car) => car.id !== carId));
  };

  return (
    <>
      <CardUnstyled
        cardBodyStyle="flex p-3 flex-row items-center"
        cardStyle="flex bg-white rounded-xl shadow-xl"
      >
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-row justify-end mt-5 mr-3 items-center">
            <label className="mr-3">Отсортировать:</label>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 w-48">
                {translateSelectedCriteria(sort)}
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[10] w-full justify-center overflow-y-auto rounded-box bg-slate-50 p-2 text-black shadow blur-none"
              >
                <li className="w-full mb-1">
                  <button
                    className="btn-sm flex justify-center"
                    onClick={() => handleSortChange('year-asc')}
                  >
                    Год (по возрастанию)
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    className="btn-sm flex justify-center"
                    onClick={() => handleSortChange('year-desc')}
                  >
                    Год (по убыванию)
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    className="btn-sm flex justify-center"
                    onClick={() => handleSortChange('price-asc')}
                  >
                    Цена (по возрастанию)
                  </button>
                </li>
                <li className="w-full">
                  <button
                    className="btn-sm flex justify-center"
                    onClick={() => handleSortChange('price-desc')}
                  >
                    Цена (по убыванию)
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-row ml-3">
              <label className="mr-3">Количество:</label>
              <p className="font-bold">{cars.length}</p>
            </div>
          </div>
          <div className="flex flex-wrap  mt-10">
            {loading && (
              <div role="status" className="flex h-full w-full items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
            {!loading &&
              sortedVehicles.map((c, i) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 p-3" key={i}>
                  <CardUnstyled
                    cardBodyStyle="flex p-3 flex-row items-center"
                    cardStyle="flex bg-[#f2f5f9] rounded-md shadow-xl"
                  >
                    <div className="w-full">
                      <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-lg">
                          {c.name} {c.model}
                        </h2>

                        <div className="flex flex-row">
                          <Modal
                            id={`changeInfo_${c.id}`}
                            title={'Редактировать карточку'}
                            subTitle={'Вы можете отредактиовать карточку'}
                            tooltipText={'Редактировать'}
                            generalButtonIcon={
                              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                                <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path>
                                <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06.92.92z"></path>
                              </svg>
                            }
                            onClick={() => setCurrentCar(c)}
                            icon={
                              <svg
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41.7 1.15 1.11 3.3.03 4.9-1.2 1.77-2.35 2.31-2.97 3.45-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15M14 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2"></path>
                              </svg>
                            }
                            input={
                              <Form
                                value={c}
                                currentValue={currentCar}
                                handleChange={handleChange}
                                handleSaveClick={handleSaveClick}
                              />
                            }
                          />
                          <div className="group relative flex justify-center">
                            <button
                              className="btn btn-link"
                              onClick={() => handleDeleteClick(c.id)}
                            >
                              <svg className="w-4 h-4 fill-red" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"></path>
                              </svg>
                            </button>
                            <span className="absolute top-10 z-10 scale-0 rounded-xl bg-[#223354] p-2 text-center text-xs text-white group-hover:scale-100">
                              {'Удалить'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">Год: {c.year}</p>
                      <p className="text-sm">Цвет: {c.color}</p>
                      <p className="text-sm">Цена: ${c.price}</p>
                      <p className="text-sm">
                        Локация: {c.latitude}, {c.longitude}
                      </p>
                    </div>
                  </CardUnstyled>
                </div>
              ))}
          </div>
          <div className="mt-12">
            <p className="text-center text-2xl font-bold">{'Расположение на карте'}</p>
            {loading && dataForMap.length === 0 && (
              <div className="skeleton w-full h-[800px]"></div>
            )}
            {!loading && dataForMap.length > 0 && (
              <Map markers={dataForMap} mapCenter={[dataForMap[0]?.lat, dataForMap[0]?.lon]} />
            )}
          </div>
        </div>
      </CardUnstyled>
    </>
  );
}
