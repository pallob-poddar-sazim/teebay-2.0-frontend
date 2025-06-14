import { useEffect, useRef } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { Controller, useForm } from "react-hook-form";

type Props = {
  variant: "buy" | "rent" | "delete";
  onConfirm: (rentStartDate?: Date, rentEndDate?: Date) => void;
  onClose: () => void;
};

type FormData = {
  rentStartDate: Date;
  rentEndDate: Date;
};

const Modal = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const buyText = "Are you sure you want to buy this product?";
  const deleteText = "Are you sure you want to delete this product?";
  const rentText = "Rental period";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        props.onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClose]);

  const handlerOnSubmit = async (formData: FormData) => {
    props.onConfirm(formData.rentStartDate, formData.rentEndDate);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/50">
      <div ref={modalRef} className="bg-white px-5 pt-8 pb-4 shadow-lg">
        <p className="text-xl">
          {props.variant === "buy"
            ? buyText
            : props.variant === "rent"
            ? rentText
            : deleteText}
        </p>

        <form onSubmit={handleSubmit(handlerOnSubmit)}>
          {props.variant === "rent" && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex flex-col">
                <label>From</label>
                <Controller
                  name="rentStartDate"
                  control={control}
                  rules={{
                    required: "From is required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const now = new Date();
                      now.setMinutes(
                        now.getMinutes() - now.getTimezoneOffset()
                      );

                      return (
                        selectedDate >= now ||
                        "Start date must be in the future"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="datetime-local"
                      field={{
                        ...field,
                        value: field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : "",
                        onChange: (e) =>
                          field.onChange(new Date(e.target.value)),
                      }}
                      error={!!errors.rentStartDate}
                    />
                  )}
                />
                {errors.rentStartDate && (
                  <p className="text-sm text-red-500 my-1">
                    {errors.rentStartDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>To</label>
                <Controller
                  name="rentEndDate"
                  control={control}
                  rules={{
                    required: "To is required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const startDate = new Date(
                        control._getWatch("rentStartDate")
                      );

                      return (
                        selectedDate >= startDate ||
                        "End date must be after start date"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="datetime-local"
                      field={{
                        ...field,
                        value: field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : "",
                        onChange: (e) =>
                          field.onChange(new Date(e.target.value)),
                      }}
                      error={!!errors.rentEndDate}
                    />
                  )}
                />
                {errors.rentEndDate && (
                  <p className="text-sm text-red-500 my-1">
                    {errors.rentEndDate.message}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-4 mt-12">
            <Button
              variant="button-secondary"
              text={props.variant === "rent" ? "Go back" : "No"}
              onClick={props.onClose}
            />
            {props.variant === "rent" ? (
              <Button
                variant="button-primary"
                text="Confirm rent"
                type="submit"
              />
            ) : (
              <Button
                type="button"
                variant="button-primary"
                text="Yes"
                onClick={() => props.onConfirm()}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
