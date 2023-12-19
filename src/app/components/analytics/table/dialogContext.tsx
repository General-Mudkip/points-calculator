import React from "react";

interface DialogContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DialogContext = React.createContext<DialogContextProps>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {},
});
