import { Button } from "antd";
import "./textPage.css"

export const TextPage = () => {
  return (
    <div className="text-page__wrapper">
      Text Page

			<Button className="text-page__button-back">Back</Button>
      <p>paragraphs 1</p>
      <p>paragraphs 2</p>
      <p>paragraphs 3</p>
      <p>paragraphs 4</p>
    </div>
  );
};
