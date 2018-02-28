let previousOverflow: string = "";

export const isDescendant = ( child: HTMLElement, parent: HTMLElement ) => {

 let el: HTMLElement = child;

 while ( el.parentNode != document.body ) {
  if ( el.parentNode == parent ) return true;

  el = el.parentNode as HTMLElement;
 }

 return false;
};

export const lockDocumentScroll = () =>
{
 if ( document.body.style.overflow == "hidden" ) return;

 previousOverflow = document.body.style.overflow;

 document.body.style.overflow = "hidden";
};

export const unlockDocumentScroll = () =>
{
 document.body.style.overflow = previousOverflow;
};


export const bodyPositionFixed = () => { if (document.body.style.overflow == "hidden") return; previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; }
export const bodyPositionUnfixed = () => { document.body.style.overflow = previousOverflow; document.body.style.position = "relative"; } 
