import * as React from "react";
import { ListView, ListViewProps } from "./ListView";

export interface SearchListViewProps extends ListViewProps {
 template?: any;
 search?: boolean;
 items?: any;
 className?: string;
 pageSize?: number;
 toggle?: any;
}

export interface SearchListViewState {
 searchQuery: string;
 currentPage: number;
 filteredItems: any[];
 maxPages: number;
}

const INITIAL_PROPS: SearchListViewProps = {
 search: false,
 pageSize: 4,
 items: [],
 className: ""
};

const INITIAL_STATE: SearchListViewState = {
 searchQuery: "",
 currentPage: 0,
 filteredItems: [],
 maxPages: 0
};

export class SearchListView extends React.Component<SearchListViewProps, SearchListViewState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: SearchListViewProps )
 {
  super(props);

  const stateFromProps = {
   filteredItems: props.items,
   maxPages: Math.min(props.items.length / props.pageSize)
  };

  this.state = { ...INITIAL_STATE, ...stateFromProps };
 }

 public componentWillReceiveProps ( newProps: SearchListViewProps )
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
  const items = this.state.filteredItems.slice(0,  upperBound);

  return (
   <div className={`shpn-search-list-view`}>
   <div>
    {this.props.search ? (
      <div className="shpn-list-view__search vertical center layout">
        <div className="pad__b-10">
          <input placeholder="Search FAQs" onChange={( event ) => {
            const items = this.props.items;
            const searchQuery = event.target.value;
            const light = new RegExp(searchQuery, "gi");
            const reg = `^${searchQuery.split(/\s/).reduce(( acc, next ) => {
              if ( !next ) return acc;

              acc += `(?=.*\\b${next}\\b)`;

              return acc;
            }, "")}.+`;

            const regexp = new RegExp(reg, "gi");
            let filteredItems = [];
            let currentPage = this.state.currentPage;          
            
            if ( searchQuery ) {
              currentPage = 0;

              for ( let item of items ) {
                try {
                  if ( light.test(item.question)
                  || regexp.test(item.question)
                  || light.test(item.answer)
                  || regexp.test(item.answer) ) {
                    filteredItems.push(item);
                  }
                } catch ( error ) { console.warn(error); }
              }
            } else {
              filteredItems = items;
            }

            this.setState({
              searchQuery,
              filteredItems,
              currentPage,
              maxPages: Math.min(filteredItems.length / this.props.pageSize)
            });
          }} />
        </div>
      </div>
    ) : null}
    </div>
    <div>
        <ListView
            pageSize={this.props.pageSize}
            items={this.state.filteredItems}
            className={this.props.className}
            template={this.props.template}
            toggle={this.props.toggle}/>
    </div>
    <div className="text-align-center pad-24" hidden={!this.state.searchQuery || items.length && !!this.state.searchQuery}>
      <strong>No Search Results Found</strong>
    </div>
   </div>
  )
 }
}
