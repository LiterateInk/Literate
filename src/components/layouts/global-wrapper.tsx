import { type ParentComponent, createSignal, onMount, onCleanup } from "solid-js";
import { useWindowSize } from "@solid-primitives/resize-observer";

const GlobalWrapper: ParentComponent = (props) => {
  // Track the window size.
  const windowSize = useWindowSize();
  
  /**
   * Drawer state, 0 is the left drawer, 1 is the main view.
   * Basically we currently have only 2 views, but in the future
   * we might have more, or we might let plugins add more views.
   */
  const [currentView, setCurrentView] = createSignal(0);

  let viewsContainerRef: HTMLDivElement | undefined;
  /**
   * 
   * We add the `-20` to let the user see a bit of the current main view. */
  const leftDrawerWidth = () => windowSize.width - 20;
  /** Total width of every views available on screen. */
  const totalWidth = () => leftDrawerWidth() + windowSize.width; 

  const startPosition = { x: 0, y: 0 };
  let startTransformX = 0;
  let transformX = 0;
  let startTime = 0;
  let pauseTouches = false;

  let transformString: string;
  let animationFrame: number;
  const setTransformX = (value: number) => {
    transformX = value;
    transformString = `translate3d(${value}px, 0, 0)`;

    // Cancel the previous animation frame.
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    
    animationFrame = window.requestAnimationFrame(function() {
      viewsContainerRef!.style.transform = transformString;
    });
  };

  onMount(() => {
    window.addEventListener("touchstart", onTouchStart, false);
    window.addEventListener("touchmove", onTouchMove, false);
    window.addEventListener("touchend", onTouchEnd, false);
  });

  onCleanup(() => {
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  });

  const onTouchStart = (event: TouchEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest("input[type=range]")) {
      pauseTouches = true;
      return;
    }
    if (target.closest("input[type=text]")) {
      pauseTouches = true;
      return;
    }

    if (target.closest("textarea")) {
      pauseTouches = true;
      return;
    }

    pauseTouches = false;

    viewsContainerRef!.style.transition = "";
    startTransformX = transformX;
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    startPosition.x =  x - transformX;
    startPosition.y = y;
    startTime = Date.now();
  };

  let ignoreDistance = false;

  const onTouchMove = (event: TouchEvent) => {
    if (pauseTouches) return;
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const touchDistance = x - startPosition.x;

    const XDistance = Math.abs(startTransformX - transformX);
    const YDistance = Math.abs(y - startPosition.y);
    if (XDistance <= 3 && YDistance >= 7 && !ignoreDistance) return pauseTouches = true;

    ignoreDistance = true;

    if (touchDistance >=0) {
      startPosition.x = x;
      return setTransformX(0);
    }

    if (-touchDistance >= leftDrawerWidth() ) {
      return setTransformX(-leftDrawerWidth());
    }

    if (touchDistance <= -totalWidth() + windowSize.width) {
      startPosition.x = x - transformX;
      return setTransformX(-totalWidth() + windowSize.width);
    }

    setTransformX(touchDistance);
  };

  const onTouchEnd = () => {
    ignoreDistance = false;
    pauseTouches = false;
    
    const isOnLeftDrawer = transformX - -leftDrawerWidth() >= leftDrawerWidth() / 2;
    const beforePage = currentView();
    
    if (isOnLeftDrawer) setCurrentView(0);
    if (!isOnLeftDrawer) setCurrentView(1);

    const distance = startTransformX - transformX;
    const time = Date.now() - startTime;
    const velocity = Math.abs(distance / time);

    if (time <= 150 && velocity >= 0.5) {
      const isSwipingLeft = distance <=0;
      const isSwipingRight = distance >=1;

      if (isSwipingRight && beforePage <= 2) {
        setCurrentView(beforePage + 1);
      }
      else if (isSwipingLeft && beforePage >=0) {
        setCurrentView(beforePage - 1);
      }
    }

    updatePage();
  };

  let velocityTimeout: ReturnType<typeof setTimeout> | undefined;
  const updatePage = () => {
    velocityTimeout && clearTimeout(velocityTimeout);

    viewsContainerRef!.style.transition = "transform 0.2s";
    velocityTimeout = setTimeout(() => {
      viewsContainerRef!.style.transition = "";
    }, 200);  
    if (currentView() === 0) setTransformX(0);
    if (currentView() === 1) setTransformX(-leftDrawerWidth());
  };

  return (
    <div class="w-fit bg-purple-100">
      <div ref={viewsContainerRef} class="flex flex-1"
        style={{ translate: transformX + "px" }}
      >
        <div class="flex-shrink-0 h-screen p-4"
          style={{ width: windowSize.width - 20 + "px" }}
        >
          <div class="bg-purple rounded-xl py-2 px-6">
            <div class="flex items-center justify-start gap-4">
              <img class="w-10 h-10 rounded-full" src="https://avatars.githubusercontent.com/u/770156" alt="Profile picture" />
              <div>
                <p>Literate USER</p>
                <p>2nde4 (306)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative w-screen max-h-screen h-full overflow-hidden">
          <div class="z-20 absolute inset-0 bg-black transition-opacity duration-200"
            classList={{
              "opacity-40": currentView() === 0,
              "opacity-0 pointer-events-none": currentView() === 1,
            }}
          />
          <div class="relative h-screen flex flex-col overflow-y-auto overflow-x-hidden">
            <main class="p-6 pb-0">
              {props.children}
            </main>

            <nav class="flex-shrink-0 mt-auto flex justify-around bg-purple-200 py-4 px-2">
              <a href="/">Accueil</a>
              <a href="/grades">Notes</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalWrapper;