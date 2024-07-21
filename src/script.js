gsap.registerPlugin(ScrollTrigger);
const track = document.getElementById("image-track");
let isScrolling = false;
let scrollTimeout;

function initializeGSAPAnimation() {
  const images = track.getElementsByClassName("image");
  gsap.set(images, { x: "0", y: "25vh", opacity: 0 });
  gsap.to(images, {
    x: 0,
    y: 0,
    opacity: 1,
    duration: 0.75,
    stagger: 0.1,
    ease: "power3.out",
    onComplete: () => {
      enableInteractions();
    },
  });
}

function enableInteractions() {
  window.addEventListener("mousedown", handleOnDown);
  window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
  window.addEventListener("mouseup", handleOnUp);
  window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));
  window.addEventListener("mousemove", handleOnMove);
  window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
  window.addEventListener("wheel", handleWheel);
}

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  updateTrackPosition(nextPercentage);
};

const handleWheel = (e) => {
  e.preventDefault();
  const delta = e.deltaY;
  const currentPercentage = parseFloat(track.dataset.percentage) || 0;
  const nextPercentage = Math.max(
    Math.min(currentPercentage - delta / 50, 0),
    -100
  );

  track.dataset.percentage = nextPercentage;
  updateTrackPosition(nextPercentage);
};

const updateTrackPosition = (percentage) => {
  gsap.to(track, {
    xPercent: percentage,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(".image", {
    objectPosition: `${100 + percentage}% center`,
    duration: 0.5,
    ease: "power2.out",
  });
};

(() => {
  initializeGSAPAnimation();

    const mainContainer = document.querySelector("#main-container");
    const lines = document.querySelectorAll(".body p");
    const borderTop = document.querySelector(".border-top");
    const borderBottom = document.querySelector(".border-bottom");
    const borderLeft = document.querySelector(".border-left");
    const borderRight = document.querySelector(".border-right");
    const plusSigns = document.querySelectorAll(".plus");
    const imageTrack = document.querySelector("#image-track");
    // Initial setup
    gsap.set(mainContainer, { opacity: 0, scale: 0.25 });
    gsap.set(lines, { y: "100%" });
    gsap.set(plusSigns, { opacity: 0 });
    gsap.set(imageTrack, { scale: 0.5, opacity: 0, y: "100%", x: "50%" });


    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(mainContainer, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    })
    .to(
      borderTop,
      {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      "borders"
    )
    .to(
      borderBottom,
      {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      "borders"
    )
    .to(
      borderLeft,
      {
        height: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      "borders"
    )
    .to(
      borderRight,
      {
        height: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      "borders"
    )
    .to(
      plusSigns,
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      },
      "-=0.5"
    )
    .to(lines, {
      y: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.075,
    })
    .to(".splash-screen", {
      y: "-100%",
      scale: 0, 
      duration: 1,
      delay: 1,
      ease: "power2.out",
    })
    .to("#image-track", {
      scale: 1,
      opacity: 1,
      y: "0%",
      x: "0%",
      duration: 1.5,
      ease: "power2.out",
    })
})();
