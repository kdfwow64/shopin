import * as React from "react";
import Transition from "react-transition-group/Transition";

export const Fade = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={{
      enter: 0,
      exit: 5000
    }}
    onEnter={node => node.classList.add('toast-enter--top-right', 'toastify-animated','toasterFadeIn')}
    onEntered={node => node.classList.remove('toastify-animated', 'toast-enter--top-right')}
    onExit={node => {
      node.classList.add('toasterFadeOut');
    }}
  >
    {children}
  </Transition>
);
