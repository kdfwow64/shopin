import * as React from "react";

export interface CardProps {
}

const INITIAL_PROPS: CardProps = {
};

export const Card: React.SFC<CardProps> = props => (
 <div className="card">
  Card
 </div>
);

Card.defaultProps = INITIAL_PROPS;
