import { useState, useRef, useEffect } from "react";
import Button from "../atoms/Button";
import CloseIcon from "@/assets/icons/close-icon.svg";
import UnfoldMoreIcon from "@/assets/icons/unfold-more-icon.svg";

type Option = {
  id: string;
  name: string;
};

type Props = {
  placeholder: string;
  options: Option[];
  onChange: (selected: Option[]) => void;
  error?: boolean;
  defaultSelected?: Option[];
};

const MultiSelect = (props: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    props.defaultSelected || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.defaultSelected?.length) {
      props.onChange(props.defaultSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: Option) => {
    if (!selectedOptions.some((selected) => selected.id === option.id)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      props.onChange(newSelectedOptions);
    }
  };

  const removeOption = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (prevOption) => prevOption.id !== option.id
    );
    setSelectedOptions(newSelectedOptions);
    props.onChange(newSelectedOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`rounded-sm cursor-pointer flex justify-between items-center overflow-auto ${
          props.error
            ? `border border-red-500 focus:outline-red-500`
            : `focus:outline-purple border-2 border-gray`
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex gap-1">
          {selectedOptions.length === 0 ? (
            <span className="p-3">{props.placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.id}
                className="flex items-center gap-1 border-2 border-gray px-2 py-1.5 m-1"
              >
                {option.name}
                <Button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                >
                  <CloseIcon />
                </Button>
              </span>
            ))
          )}
        </div>
        <span className="pr-2">
          <UnfoldMoreIcon />
        </span>
      </div>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border-2 border-gray rounded-sm shadow-md z-10">
          {props.options.map((option) => (
            <li
              key={option.id}
              className="p-2 hover:bg-purple cursor-pointer"
              onClick={() => selectOption(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
