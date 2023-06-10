import trueIcon from "../images/true.svg";
import faildeIcon from "../images/failed.svg";

function InfofTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-type-infoTooltip">
        <button
          className="popup__close popup__close_image"
          onClick={props.onClose}
          type="button"
        ></button>
        <img
          className="popup__tooltip-image"
          src={props.status ? trueIcon : faildeIcon}
          alt="Статуса"
        />
        <p className="popup__tooltip-about">{props.title}</p>
      </div>
    </div>
  );
}
export default InfofTooltip;
