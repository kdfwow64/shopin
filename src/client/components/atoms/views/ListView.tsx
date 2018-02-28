import * as React from "react";

export interface ListViewProps {
 template?: any;
 search?: boolean;
 items?: any;
 className?: string;
 pageSize?: number;
 toggle?: any;
}

export interface ListViewState {
 searchQuery: string;
 currentPage: number;
 filteredItems: any[];
 maxPages: number;
}

const INITIAL_PROPS: ListViewProps = {
 search: false,
 pageSize: 4,
 items: [],
 className: ""
};

const INITIAL_STATE: ListViewState = {
 searchQuery: "",
 currentPage: 0,
 filteredItems: [],
 maxPages: 0
};

export class ListView extends React.Component<ListViewProps, ListViewState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: ListViewProps )
 {
  super(props);

  const stateFromProps = {
   filteredItems: props.items,
   maxPages: Math.min(props.items.length / props.pageSize)
  };

  this.state = { ...INITIAL_STATE, ...stateFromProps };
 }

 public componentWillReceiveProps ( newProps: ListViewProps )
 {
  if ( this.props.items != newProps.items ) {
   this.update(newProps);
  }
 }

 public update ( props = this.props )
 {
  this.setState({
   currentPage: 0,
   maxPages: Math.min(props.items.length / props.pageSize)
  });
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 1);
 }

 public render ()
 {
  const upperBound = ((this.state.currentPage + 1) * this.props.pageSize);
  const items = this.props.items.slice(0,  upperBound);

  return (
   <div className={`shpn-list-view`}>
    <div>
      <div className={`shpn-list-view__Items ${this.props.className}`}>
      {items.map(this.props.template)}
      </div>
    </div>
    <div className="shpn-list-view__toggle vertical center layout" hidden={this.state.currentPage == this.state.maxPages - 1}>
     <div onClick={() => {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }}>{(this.state.currentPage < this.state.maxPages - 1)?this.props.toggle:""}</div>
    </div>
    <div className="text-align-center pad-24" hidden={!this.state.searchQuery || items.length && !!this.state.searchQuery}>
      <strong>No Search Results Found</strong>
    </div>
   </div>
  )
 }
}
