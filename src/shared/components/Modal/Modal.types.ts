export type TModalProps = {
  variant: "buy" | "rent" | "delete";
  onConfirm: (rentStartDate?: Date, rentEndDate?: Date) => void;
  onClose: () => void;
};

export type TRentalFormFields = {
  rentStartDate: Date;
  rentEndDate: Date;
};
