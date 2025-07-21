import { useState, useRef, useEffect } from "react";
import { X, ChevronsUpDown } from "lucide-react";
import { Button } from "../shadui/button";
import { TMultiSelectProps } from "./MultiSelect.types";
import { ICategory } from "@/shared/typedefs";

const MultiSelect = (props: TMultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<ICategory[]>(props.defaultSelected || []);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);

  const { defaultSelected, onChange } = props;

  useEffect(() => {
    if (!hasInitialized.current && defaultSelected?.length) {
      onChange(defaultSelected);
      hasInitialized.current = true;
    }
  }, [defaultSelected, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectOption = (option: ICategory) => {
    if (!selectedOptions.some((selected) => selected.id === option.id)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      props.onChange(newSelectedOptions);
    }
  };

  const removeOption = (option: ICategory) => {
    const newSelectedOptions = selectedOptions.filter((prevOption) => prevOption.id !== option.id);
    setSelectedOptions(newSelectedOptions);
    props.onChange(newSelectedOptions);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`rounded-sm cursor-pointer flex justify-between items-center overflow-auto ${
          props.error
            ? `border border-red-500 focus:outline-red-500`
            : `focus:outline-purple border border-input`
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1">
          {selectedOptions.length === 0 ? (
            <span className="p-3">{props.placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.id}
                className="flex items-center gap-1 border border-input px-2 py-1.5 m-1"
              >
                {option.name}
                <Button
                  variant={"ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                >
                  <X />
                </Button>
              </span>
            ))
          )}
        </div>
        <span className="pr-2">
          <ChevronsUpDown size={14} />
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
