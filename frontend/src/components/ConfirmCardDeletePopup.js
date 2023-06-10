import PopupWithForm from "./PopupWithForm";

function ConfirmCardDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete(props.cardId);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Да"
    />
  );
}
export default ConfirmCardDeletePopup;
