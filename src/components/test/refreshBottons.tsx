import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const RefreshBottons = () => {


	
let history = useNavigate();
const arrowBack = () => history(-1);
const arrowForward = () => history(1);
const refresh = () => history(0);

  return (
    <>
      <Button id="buttonBack" onClick={arrowBack}>
        Назад
      </Button>
      <Button onClick={arrowForward}>Вперед</Button>
      <Button onClick={refresh}>Обновить</Button>
      <br />
      <br />
      <br />
      <div>
        <span>Event</span>
      </div>
      <div className="block-for-mouse"></div>
    </>
  );
};
