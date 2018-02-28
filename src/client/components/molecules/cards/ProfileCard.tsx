import * as React from "react";
import { Profile } from "core/types";
import {AssetPaths} from "core/constants/content"
import {cardClass} from "core/constants/content"
import { Img } from "components/atoms";

export interface ProfileCardProps {
 profile: Profile;
 index?:number
}

const INITIAL_PROPS: ProfileCardProps = {
 profile: {
  name: "",
  title: "",
  bio: "",
  src: "",
  linkedin:""
 }
};

export const ProfileCard: React.SFC<ProfileCardProps> = ({ profile,index }) => (
 <div className={ "profile-card " + cardClass[index]}>
  <Img src={profile.src} className="fit-width block" />
  <p className="profile-name">{profile.name}
  	<a href= {profile.linkedin} target="_blank" >
 		<Img  className="profile-image" src={AssetPaths.graphics + "/" + "linkedin.svg"} />
 	</a>
  </p>
  <p className="profile-title">{profile.title}</p>
  <p className="profile-bio">{profile.bio}</p>
 </div>
);

ProfileCard.defaultProps = INITIAL_PROPS;
