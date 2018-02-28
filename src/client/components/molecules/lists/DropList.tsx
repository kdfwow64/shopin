import * as React from "react";

export interface DropListProps {
}

export interface DropListState {
}

const INITIAL_PROPS: DropListProps = {
};

const INITIAL_STATE: DropListState = {
};

export class DropList extends React.Component<DropListProps, DropListState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: DropListProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public render ()
 {
  return (
   <div className="drop-list">
    DropList
   </div>
  )
 }
}
