import * as React from "react";
import {AssetPaths,materials} from "core/constants/content";
import { Img } from "components/atoms";


export interface ListProps {
	assetFile?:string,
	content?:string,
	seperatorClass?:string,
	link?:string,
	whitePaperPdf?:string,
	onFocus?:any
}

const INITIAL_PROPS: ListProps = {
};


export class ListCard extends React.Component<ListProps,{}>{

	public static defaultProps = INITIAL_PROPS;

	public onMouseOverImg(){
		this.props.onFocus(this.props.content)
	}
  constructor ( props: ListProps )
  {
   		super(props);
  }

	public render(){
		const props = this.props;
		const state = this.state;
		if(props.content == "Whitepaper" && props.whitePaperPdf !="Eng"){
			// if whitepaper non english case get pdfs 
			return (

				<div className="shopin-materials-type-list"  >
	        		<Img   src={AssetPaths.graphics + "/" + props.assetFile }   className= { props.seperatorClass } />
	        				<span onMouseOver = {this.onMouseOverImg.bind(this)} ><a  href={AssetPaths.files + '/' + materials['whitePaperLinks'][props.whitePaperPdf] } target="_blank" >{props.content}</a></span>
		  		</div>
				)
		}
		else{
			return (
				<div className="shopin-materials-type-list"  >
	        <Img  src={AssetPaths.graphics + "/" + props.assetFile }   className= { props.seperatorClass } />
	        <span onMouseOver = {this.onMouseOverImg.bind(this)} ><a  href={props.link} target="_blank">{props.content}</a></span>
		  		</div>
			)
		}
	}

}

ListCard.defaultProps = INITIAL_PROPS;
