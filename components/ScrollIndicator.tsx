import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createElementSize } from "@solid-primitives/resize-observer";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { useLocation } from "solid-start";

export default function ScrollIndicator(props) {
  const location = useLocation();

  // we try setting this further down in the create effect
  let el: HTMLElement | undefined;
  const visible = createVisibilityObserver({ threshold: 0.8 })(() => {
    console.log("inside observer");
    return el;
  });

  if (!isServer) {
    // triggers update if nav element changes width/height
    const size = createElementSize(
      document.querySelector(".scroll-indicator-inner").parentElement.parentElement as HTMLElement
    );

    createEffect(() => {
      // triggers update on location change
      location.pathname;

      const activeLinkEl = document.querySelector(".scroll-indicator-inner a.text-primary") as HTMLElement;

      // Q: This doesn't work (visible is never true)
      // Probably need to use ref instead to get active link or pass in ref via props?
      el = activeLinkEl;

      console.log("visible?", visible(), activeLinkEl);

      if (activeLinkEl !== null) {
        const scrollHeight = document.querySelector(".scroll-indicator-inner")?.scrollHeight || 0;

        const scrollMarkerEl = document.querySelector(".scroll-marker-container span") as HTMLElement;
        scrollMarkerEl.style.top = Math.ceil((activeLinkEl.offsetTop * size.height) / scrollHeight) + "px";
      }
    });
  }

  return (
    <div class="scroll-indicator-inner px-8 py-8">
      <div class="scroll-marker-container">
        <span classList={{ hidden: visible() }}></span>
      </div>
      {props.children}
    </div>
  );
}
