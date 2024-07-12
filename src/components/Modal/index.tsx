import { handleShowModal } from './func/modalOpenOrClose';

interface ConfirmationModalBoxProps {
  id: string;
  input: React.ReactNode;
  title: string;
  subTitle?: string;
  generalButtonIcon?: React.ReactNode;
  icon?: React.ReactNode;
  tooltipText?: string;
  needButton?: boolean;
  onClick?: () => void;
}

export default function ConfirmationModalBox({
  id,
  title,
  subTitle,
  generalButtonIcon,
  icon,
  tooltipText,
  input,
  needButton = true,
  onClick,
}: ConfirmationModalBoxProps) {
  return (
    <>
      {needButton && (
        <div className="group relative flex justify-center">
          <button
            className={'btn btn-link bg-transparent no-underline'}
            onClick={() => {
              handleShowModal(`${id}`);
              onClick && onClick();
            }}
          >
            {generalButtonIcon}
          </button>
          {tooltipText && (
            <span className="absolute top-10 z-10 scale-0 rounded-xl bg-[#223354] p-2 text-center text-xs text-white group-hover:scale-100">
              {tooltipText}
            </span>
          )}
        </div>
      )}
      <dialog id={`${id}`} className="modal">
        <div
          className="modal-box h-auto w-full bg-slate-100 p-0 shadow-xl sm:w-4/5 lg:w-3/5"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="bg-slate-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {icon}
              </div>

              <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">{subTitle}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-3 w-full p-6">{input}</div>
        </div>
      </dialog>
    </>
  );
}
