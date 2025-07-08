import CloseIcon from "@/assets/icons/close-icon.svg";
import SendIcon from "@/assets/icons/send.svg";
import { Controller, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import IMessage from "@/interfaces/IMessage";

type Props = {
  chatPartner: {
    id: string;
    name: string;
  };
  messages: IMessage[];
  onClose: () => void;
};

const Chat = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

  return (
    <article className="fixed bottom-0 right-10 z-2 w-80 h-100 bg-white rounded-xl shadow-xl flex flex-col">
      <div className="p-3 flex items-center justify-between gap-2 border-b border-gray">
        <p>{props.chatPartner.name}</p>
        <Button onClick={props.onClose} className="cursor-pointer">
          <CloseIcon />
        </Button>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {props.messages.map((message, index) => (
          <p
            key={index}
            className={`px-3 py-2 w-fit max-w-7/10 rounded-full text-sm ${
              props.chatPartner.id === message.sender.id
                ? "mr-auto bg-gray"
                : "ml-auto bg-blue"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <div className="px-3 py-2 border-t border-gray flex items-center justify-between gap-4">
        <div className="w-full">
          <Controller
            name="message"
            control={control}
            rules={{
              maxLength: {
                value: 2000,
                message: "Character limit exceeded",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Aa"
                {...field}
                className="px-3 py-2 w-full rounded-full bg-gray-100"
              />
            )}
          />
          {errors.message && (
            <p className="text-sm text-red-500 my-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <SendIcon className="fill-purple" />
      </div>
    </article>
  );
};

export default Chat;
