import { Cars } from '../../api/getCars';
import { handleCloseModal } from '../Modal/func/modalOpenOrClose';

interface FormProps {
  value: Cars;
  currentValue: Cars | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveClick: () => void;
}

export default function Form({ value, currentValue, handleChange, handleSaveClick }: FormProps) {
  return (
    <>
      <div className="mb-3">
        <label className="block mb-1">Имя</label>
        <input
          id={`${value.name}_${value.id}`}
          type="text"
          name="name"
          value={currentValue?.name}
          onChange={handleChange}
          className="w-full input input-bordered border-2 placeholder-transparent bg-transparent p-4  hover:border-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Модель</label>
        <input
          id={`${value.model}_${value.id}`}
          type="text"
          name="model"
          value={currentValue?.model}
          onChange={handleChange}
          className="w-full input input-bordered border-2 placeholder-transparent bg-transparent p-4  hover:border-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Цена</label>
        <input
          id={`${value.price}_${value.id}`}
          type="text"
          name="price"
          value={currentValue?.price}
          onChange={handleChange}
          className="w-full input input-bordered border-2 placeholder-transparent bg-transparent p-4  hover:border-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex flex-row justify-end mt-5">
        <button
          className="btn btn-ghost btn-md mr-5 text-gray-500"
          type="button"
          onClick={() => {
            handleCloseModal(`changeInfo_${value.id}`);
          }}
        >
          Отмена
        </button>
        <button
          className="btn btn-md border-none bg-green-500 text-white hover:bg-green-600"
          type="submit"
          onClick={() => {
            handleSaveClick();
            handleCloseModal(`changeInfo_${value.id}`);
          }}
        >
          {'Сохранить'}
        </button>
      </div>
    </>
  );
}
