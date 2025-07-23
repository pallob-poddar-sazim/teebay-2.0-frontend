import { UUID } from "crypto";

export type TChatProps = {
  currentUserId: UUID;
  chatPartner: {
    id: UUID;
    name: string;
  };
  onClose: () => void;
};
