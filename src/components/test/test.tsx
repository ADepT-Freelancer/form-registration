import { AnswersColumns } from "./answersColumns";
import { AnswersFields } from "./answersFields";
import { ListInput } from "./listInput";
import { RefreshBottons } from "./refreshBottons";
import { TextPage } from "./textPage";

export const TestPage = () => {
  return (
    <div className="test__wrapper">
      <div> Test Page</div>
     
      <br />
      <br />
      <TextPage /> <br />
      <br />
      <AnswersFields />
      <br />
      <br />
      <AnswersColumns />
      <br />
      <br />
      <ListInput />
      <br />
      <br />
      <RefreshBottons />
      <br />
      <br />
      <TextPage />
    </div>
  );
};
