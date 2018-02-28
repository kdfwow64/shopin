import * as React from "react";
import {AssetPaths} from "core/constants/content"
import { DropDownView } from "components/atoms";

export interface QuestionAnswerProps {
	question?:string,
	answer?:string,
	index?:number
}

const INITIAL_PROPS: QuestionAnswerProps = {
};

export const QuestionAnswerCard: React.SFC<QuestionAnswerProps> = props => (

  <DropDownView className="faq-item" top={(
   <div className="horizontal layout">
      <div className="item-count">
        <span>{props.index}</span>
      </div>
      <div className="flex question horizontal layout">
        <h2 className='faq-header text-align-left'>{props.question}</h2>
      </div>
      <div className="close">
        <a href="javascript:;"><img className="drop-down-close" src={AssetPaths.graphics + "/" + "cancel.svg"} /></a>
      </div>
   </div>
   )} bottom={(
    <p><span dangerouslySetInnerHTML={({ __html: props.answer })} /></p>
   )} />
);

QuestionAnswerCard.defaultProps = INITIAL_PROPS;
