import "./conect-toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlus as plus } from "@fortawesome/free-solid-svg-icons";
import { faShareSquare as share } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Share } from "../Share/Share";

interface ConectToolbarInterface {
  onHeartClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  onAddClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  shareUrlProp: string;
}

export const ConectToolbar = ({
  onHeartClickHandler,
  onAddClickHandler,
  shareUrlProp,
}: ConectToolbarInterface) => {
  const [shareShow, setShareShow] = useState(false);
  return (
    <>
      <div className="conectToolbar">
        <button
          onClick={onHeartClickHandler}
          className="conectButton"
          type="button"
        >
          <FontAwesomeIcon icon={regularHeart} className="conectIcon" />
        </button>
        <button onClick={onAddClickHandler} className="conectButton">
          <FontAwesomeIcon icon={plus} className="conectIcon" />
        </button>
        <button onClick={() => setShareShow(true)} className="conectButton">
          <FontAwesomeIcon icon={share} className="conectIcon" />
        </button>
      </div>
      <Modal
        size="xl"
        show={shareShow}
        onHide={() => setShareShow(false)}
        aria-labelledby="example-modal-sizes-title-xl"
      >
        <div onClick={() => setShareShow(false)} className="closeModalBtn">
          <img
            className="playBtnImg"
            src={require(`../../images/icons/close.png`)}
            alt="icon"
          />
        </div>
        <div className="shareModal">
          <Share shareUrl={shareUrlProp} />
        </div>
      </Modal>
    </>
  );
};
