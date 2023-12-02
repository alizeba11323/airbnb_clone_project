"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import Button from "./Button";
interface ModelProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  hasNextPage?: boolean;
  setNextPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const Model: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
  hasNextPage,
  setNextPage,
}) => {
  const [showModel, setShowModel] = useState(isOpen);
  useEffect(() => {
    setShowModel(isOpen);
  }, [isOpen]);
  const handleClose = useCallback(() => {
    if (disabled) return;
    if (hasNextPage) {
      console.log(hasNextPage);
      setNextPage(false);
    } else {
      setShowModel(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) return null;
  return (
    <div
      className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
    >
      <div
        className="
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          h-full
          md:h-auto
          lg:h-auto

          "
      >
        <div
          className={`
                  translate
                   duration-300
                    h-full
                    ${showModel ? "translate-y-0" : "translate-y-full"}
                    ${showModel ? "opacity-100" : "opacity-0"}
                    `}
        >
          <div
            className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg
                    shadow-lg
                    relative
                    flex
                    flex-col
                    w-full
                    bg-white
                    ouline-none
                    focus:outline-none

                  "
          >
            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px] ">
              <button
                onClick={handleClose}
                className="
                rounded-full
                hover:bg-neutral-200
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-9
                "
              >
                {hasNextPage ? <MdArrowBackIos /> : <IoMdClose size={18} />}
              </button>
              <div className="text-lg font-bold">{title}</div>
            </div>
            <div className="relative p-6  flex-auto ">{body}</div>
            <div className="flex flex-col gap-1 p-6">
              <div className="flex flex-row w-full gap-4 items-center">
                {secondaryAction && secondaryLabel && (
                  <Button
                    disabled={disabled}
                    onClick={secondaryAction}
                    label={secondaryLabel}
                    outline
                  />
                )}
                <Button
                  disabled={disabled}
                  onClick={handleSubmit}
                  label={actionLabel}
                />
              </div>
              {!hasNextPage && footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
