import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createElementSize } from "@solid-primitives/resize-observer";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { useLocation } from "solid-start";

export default function ScrollIndicator(props) {
  const location = useLocation();

  let el: HTMLElement | undefined;
  const visible = createVisibilityObserver({ threshold: 0.8 })(() => {
    console.log('inside observer');
    return el;
  });

  if (!isServer) {
    // triggers update if nav element changes width/height
    const size = createElementSize(document.querySelector(".scroll-indicator-inner").parentElement.parentElement as HTMLDivElement);

    createEffect(() => {
      const activeLinkEl = document.querySelector(".scroll-indicator-inner a.text-primary") as HTMLElement;

      // Q: This doesn't work (visible is never true)
      el = activeLinkEl;

      console.log('visible?', visible(), activeLinkEl)

      if (activeLinkEl !== null) {
        const scrollHeight = document.querySelector(".scroll-indicator-inner")?.scrollHeight || 0;

        const scrollMarkerEl = document.querySelector(".scroll-marker-container span") as HTMLElement;
        scrollMarkerEl.style.top = Math.ceil((activeLinkEl.offsetTop * size.height) / scrollHeight) + "px";
        // scrollMarkerEl.style.display = visible() ? "block" : "none";
      }

      // triggers update on location change
      console.log('Setting scroll indicator for', location.pathname);
    });
  }

  return (
    <div class="scroll-indicator-inner px-8 py-8">
      <div class="scroll-marker-container"><span classList={{ 'hidden': visible() }}></span></div>
      {props.children}
    </div>
  );
}