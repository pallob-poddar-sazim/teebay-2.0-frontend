import { UUID } from "crypto";

export type TRentalCreationFields = {
  productId: UUID;
  borrowerId: UUID;
  rentStartDate: Date;
  rentEndDate: Date;
};

export type TPurchaseCreationFields = {
  productId: UUID;
  buyerId: UUID;
};
