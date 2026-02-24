import clsx from "clsx";
import Modal from "../Modal/Modal";
import Button from "../Button";

const ConfirmModal = ({ isOpen, title, description, onClose, onAction }) => {
  const modalBody = (
    <div className="flex flex-col gap-8">
      <p className="pb-1 text-sm text-neutral-600">{description}</p>

      <div className={clsx("flex gap-3")}>
        <Button
          label="Cancel"
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={onClose}
        />
        <Button label="Yes" size="lg" className="flex-1" onClick={onAction} />
      </div>
    </div>
  );

  return (
    <Modal
      className={"max-w-[343px] md:max-w-[343px]5 lg:max-w-[343px]"}
      title={title}
      children={modalBody}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default ConfirmModal;
