# {#reach-top} Getting Started
<script type="module">
  function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElm(".footer").then((elm) => {
  const domContainer = document.querySelector(".footer");
  const root = ReactDOM.createRoot(domContainer);
  root.render(e(LikeButton));
});
</script>
<div class="bg-image">
  <div class="banner-text-container">
    <img src="/assets/img/big-logo.svg" width="197" height="145" alt="logo" />
    <p class="title-background">
      Reach <span style="font-weight: bold">documentation</span>
    </p>
    <p class="text-logo">
      The <span class="bold">Smartest</span>, <span class="bold">Fastest</span>, and <span class="bold">Safest</span> DApp Programming Language
    </p>
  </div>
</div>
<div class="container-sm g-3 mb-4">
  <p class="intro-title-text">
    Getting <span class="blue-bg-text">Started</span>
  </p>
  <p>
    Read an overview of the <span class="bold">language</span> or <span class="bold">dive</span> straight into the <span class="bold">code with
    tutorials</span>
  </p>
  <div class="row">
    <section class="col-sm-4 p-2">
      <a href="/tut/#tuts">
        <div class="first-row">
          <img class="banner" src="../assets/img/read.svg" />
          <div class="p-1">
            <p class="learn" class="card-text mt-2">Learn Reach</p>
            <p class="learn-text" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div>
          <img class="img-fluid p-1" src="../assets/img/learn-reach.svg" />
        </div>
      </a>
    </section>
    <section class="col-sm-4 p-2">
      <a href="/quickstart/#quickstart">
        <div class="first-row build-connect">
          <img class="banner" src="../assets/img/use.svg" />
          <div class="p-1">
            <p class="use" class="card-text mt-2">Build with us</p>
            <p class="use-text" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div>
          <img class="img-fluid p-1" src="../assets/img/build-with-us.svg" />
        </div>
      </a>
    </section>
    <section class="col-sm-4 p-2">
      <a href="/tut/#tuts">
        <div class="first-row build-connect">
          <img class="banner" src="../assets/img/use.svg" />
          <div class="p-1">
            <p class="use" class="card-text mt-2">Connect to Reach Cloud</p>
            <p class="use-text" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div>
          <img class="img-fluid p-1" src="../assets/img/connect-with-us.svg" />
        </div>
      </a>
    </section>
  </div>
</div>

<div class="language">
  <div class="container-sm g-3 mb-4">
    <p class="explore-title-text">
      Explore the <span class="white-bg-text">Language</span>
    </p>
    <p>Get familiar with the <span class="bold">language</span> and explore its <span class="bold">main concepts</span>.</p>
    <div class="roadmap-top-text-container">
      <p class="roadmap-top-text">Here's your roadmap, <span class="bold">follow the path!</span></p>
    </div>
    <div class="row">
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="50" height="52" viewBox="0 0 50 52" fill="none"><rect width="2.42981" height="12.149" transform="matrix(1 2.3283e-10 2.3283e-10 -1 23.7236 12.656)" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.7241 12.656L0.640625 12.656L0.640625 51.533L49.2368 51.533L49.2368 12.656L26.1539 12.656L26.1539 35.5722L37.0432 24.6829L38.7613 26.401L26.7344 38.428L26.7344 38.428L25.0162 40.1461L25.0162 40.1461L11.2712 26.4011L12.9893 24.6829L23.7241 35.4177L23.7241 12.656Z" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
                <p class="explore-title">Download Reach</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                quam inte
              </p>
            </div>
             <p class="explore-link p-2">Learn more
               <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
             </p>
          </div>
             <section class="shape-section">
          <div class="diamond-shape">
            <div class="item-count">1</div>
          </div>
           <div class="first-number-line"></div>
        </section>
      </section>
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="49" height="50" viewBox="0 0 49 50" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.26429 7.7901C5.82173 9.03768 4.62756 9.93152 3.22386 9.93152C1.44337 9.93152 0 8.49342 0 6.71942C0 4.94543 1.44337 3.50732 3.22386 3.50732C4.62754 3.50732 5.82169 4.40114 6.26427 5.6487H48.358V7.7901H6.26429Z" fill="currentColor"/><path d="M0 12.0386V46.0862H48.3579V12.0386H0ZM20.5337 34.1435V23.9611L29.0511 29.0489L20.5337 34.1435Z" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
             <p class="explore-title">Complete first tutorial</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                quam inte
              </p>
            </div>
            <p class="explore-link p-2">Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
            </p>
          </div>
          <section class="shape-section">
          <div class="diamond-shape">
            <div class="item-count">2</div>
          </div>
        <div class="number-line"></div>
        </section>
      </section>
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="45" height="43" viewBox="0 0 45 43" fill="none"><mask id="mask0_428_14178" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="40"><path d="M21.6815 33.002L26.362 28.3215L28.4895 26.194L33.1168 17.0988L34.3182 0.66394L0.703613 0.66394L0.703613 38.959L27.6385 38.959L21.6815 33.002Z" fill="currentColor" stroke="black" stroke-width="0.913048"/></mask><g mask="url(#mask0_428_14178)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.7384 2.57397C19.6046 2.70733 19.4311 3.03036 19.3288 3.33676C19.0867 4.06162 18.9493 4.20787 18.228 4.50807C16.0361 5.42061 14.6573 6.83463 13.9749 8.86997C13.7487 9.54465 13.7237 9.72334 13.6859 10.9376C13.6632 11.6686 13.6739 12.8647 13.7096 13.5956L13.7746 14.9245L13.3771 15.1861C13.1415 15.3411 12.8814 15.6071 12.7386 15.8391C12.523 16.1894 12.4978 16.2976 12.4978 16.8729C12.4978 17.4264 12.5319 17.5868 12.7445 18.0322C13.1523 18.8864 14.5174 20.8263 16.0464 22.7241C17.4514 24.4682 17.4867 24.5211 17.4446 24.8189C17.3796 25.2791 17.1389 25.6844 16.693 26.0838C15.9535 26.7464 15.0507 27.1043 10.8219 28.4113C7.65031 29.3915 5.76126 30.3613 4.33117 31.7435C2.93101 33.0967 2.17518 34.7484 2.03289 36.7654L1.97998 37.5156L13.9623 37.5156C20.5527 37.5156 33.467 37.5188 33.467 37.5015C33.467 37.4842 32.3233 36.717 32.1905 36.4062C31.8792 35.6772 30.7139 35.1312 30.6089 34.2787C30.2956 31.7319 29.4231 33.3571 30.9784 31.3001L32.616 29.1726L27.2217 25.9847C26.9248 25.7082 26.6671 25.1601 26.6648 24.7998C26.6634 24.5935 26.751 24.424 27.0344 24.084C29.4635 21.1708 31.2197 18.58 31.5644 17.4014C31.7338 16.8222 31.7258 16.2272 31.5441 15.8838C31.4524 15.7105 31.2405 15.5173 30.9784 15.3681L30.5595 15.1295L30.6089 12.6643C30.6619 10.024 30.6184 9.51149 30.2604 8.56197C29.8816 7.55727 29.0516 6.44846 28.1125 5.69266C25.9135 3.92293 22.7971 2.53484 20.7032 2.39249C19.9724 2.34279 19.9699 2.34327 19.7384 2.57397Z" fill="currentColor"/></g><path fill-rule="evenodd" clip-rule="evenodd" d="M34.4907 23.4901L44.0776 33.077L34.4907 42.6639L24.9038 33.077L34.4907 23.4901ZM35.5562 32.0121L38.7512 32.0121L38.7512 34.1425L35.5562 34.1425L35.5562 37.3388L33.4258 37.3388L33.4258 34.1425L30.2297 34.1425L30.2297 32.0121L33.4258 32.0121L33.4258 28.8173L35.5562 28.8173L35.5562 32.0121Z" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
             <p class="explore-title">Register for Ascent (or [out] Reach Hack)</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                quam inte
              </p>
            </div>
            <p class="explore-link p-2">Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
            </p>
          </div>
            <section class="shape-section">
          <div class="diamond-shape">
            <div class="item-count">3</div>
          </div>
          <div class="number-line"></div>
        </section>
      </section>
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
           <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="49" height="56" viewBox="0 0 49 56" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M38.4456 13.2424L48.2354 13.2424L48.2354 15.2424L38.5854 15.2424C38.2328 16.6355 36.9669 17.6666 35.4592 17.6666C33.9516 17.6666 32.6856 16.6355 32.333 15.2424L0.235352 15.2424L0.235352 13.2424L32.4728 13.2424C32.9529 12.0693 34.1091 11.2424 35.4592 11.2424C36.8093 11.2424 37.9655 12.0693 38.4456 13.2424Z" fill="currentColor"/><path d="M0.235352 19.7737L0.235352 53.8213L48.5933 53.8213L48.5933 19.7737L0.235352 19.7737ZM20.769 41.8786L20.769 31.6962L29.2865 36.784L20.769 41.8786Z" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
            <p class="explore-title">Complete advanced tutorial</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                quam inte
              </p>
            </div>
            <p class="explore-link p-2">Learn more
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
            </p>
          </div>
           <section class="shape-section">
          <div class="diamond-shape">
            <div class="item-count">4</div>
          </div>
          <div class="number-line"></div>
        </section>
      </section>
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="49" height="56" viewBox="0 0 49 56" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.76709 11.821L33.4944 11.821L48.7671 25.1759L48.7671 53.821L0.76709 53.821L0.76709 11.821ZM48.7671 11.821L48.7671 22.4795L36.578 11.821L48.7671 11.821ZM16.8107 27.9817L15.2689 26.6335L7.95254 33.031L15.2689 39.4286L16.8107 38.0804L11.0362 33.031L16.8107 27.9817ZM34.2653 26.6335L32.7235 27.9817L38.498 33.031L32.7235 38.0804L34.2653 39.4286L41.5816 33.031L34.2653 26.6335ZM21.441 44.779L30.1683 21.8851L28.098 21.2831L19.3707 44.177L21.441 44.779Z" fill="currentClor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.76709 11.821L33.4944 11.821L48.7671 25.1759L48.7671 53.821L0.76709 53.821L0.76709 11.821ZM16.8107 27.9817L15.2689 26.6335L7.95254 33.031L15.2689 39.4286L16.8107 38.0804L11.0362 33.031L16.8107 27.9817ZM34.2653 26.6335L32.7235 27.9817L38.498 33.031L32.7235 38.0804L34.2653 39.4286L41.5816 33.031L34.2653 26.6335ZM21.441 44.779L30.1683 21.8851L28.098 21.2831L19.3707 44.177L21.441 44.779Z" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
            <p class="explore-title">Build a Reach DApp</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                quam inte
              </p>
            </div>
            <p class="explore-link p-2">Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
            </p>
          </div>
       <section class="shape-section">
          <div class="diamond-shape">
            <div class="item-count">5</div>
          </div>
          <div class="number-line"></div>
        </section>
        </section>
      </section>
      <section class="col-sm-2 p-2 reverse">
          <div class="first-explore-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-2" width="50" height="58" viewBox="0 0 50 58" fill="none"><mask id="mask0_493_12801" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1" y="-1" width="40" height="45"><path d="M21.4478 43.0734L21.4478 29.1449L30.08 29.1449L36.4182 18.7136L37.757 0.399536L0.298828 0.399536L0.298828 43.0734L21.4478 43.0734Z" fill="#D9D9D9" stroke="black" stroke-width="1.01745"/></mask><g mask="url(#mask0_493_12801)"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4987 5.59909C18.3745 5.7228 18.2136 6.02245 18.1187 6.30668C17.8942 6.97908 17.7667 7.11475 17.0976 7.39322C15.0643 8.23973 13.7853 9.55141 13.1522 11.4395C12.9424 12.0653 12.9193 12.2311 12.8842 13.3575C12.8631 14.0355 12.873 15.1451 12.9062 15.8231L12.9665 17.0559L12.5977 17.2985C12.3792 17.4423 12.1379 17.689 12.0055 17.9042C11.8054 18.2292 11.782 18.3296 11.782 18.8632C11.782 19.3767 11.8137 19.5254 12.0109 19.9386C12.3892 20.7311 13.6555 22.5305 15.0738 24.291C16.3772 25.9089 16.4099 25.958 16.3709 26.2342C16.3106 26.6611 16.0873 27.0371 15.6737 27.4076C14.9876 28.0223 14.1502 28.3542 10.2274 29.5666C7.28537 30.4759 5.53303 31.3755 4.20643 32.6577C2.90759 33.913 2.20647 35.4451 2.07447 37.3162L2.02539 38.0121L13.1406 38.0121C19.2541 38.0121 31.2338 38.015 31.2338 37.999C31.2338 37.9829 30.1728 37.2713 30.0497 36.9829C29.7609 36.3067 28.6799 35.8002 28.5826 35.0094C28.2918 32.6469 27.4826 34.1545 28.9253 32.2464L30.4444 30.2729L25.4405 27.3156C25.165 27.0592 24.926 26.5507 24.9238 26.2165C24.9226 26.0251 25.0038 25.8679 25.2667 25.5525C27.52 22.8502 29.1491 20.4468 29.4688 19.3535C29.626 18.8162 29.6186 18.2643 29.45 17.9457C29.365 17.7849 29.1684 17.6058 28.9253 17.4674L28.5367 17.2461L28.5826 14.9592C28.6317 12.51 28.5914 12.0346 28.2593 11.1538C27.9079 10.2218 27.1379 9.19319 26.2668 8.49209C24.2269 6.85043 21.336 5.56279 19.3936 5.43074C18.7157 5.38464 18.7135 5.38508 18.4987 5.59909Z" fill="currentColor"/></g><rect x="24.9547" y="32.6518" width="15.7428" height="15.7428" stroke="currentColor" stroke-width="2.69758"/><mask id="path-4-inside-1_493_12801" fill="currentColor"><path d="M28.5234 38.6791L34.6702 38.6791L34.6702 44.8259L28.5234 44.8259L28.5234 38.6791Z"/></mask><path d="M28.5234 44.8259L26.5234 44.8259L26.5234 46.8259L28.5234 46.8259L28.5234 44.8259ZM34.6702 42.8259L28.5234 42.8259L28.5234 46.8259L34.6702 46.8259L34.6702 42.8259ZM30.5234 44.8259L30.5234 38.6791L26.5234 38.6791L26.5234 44.8259L30.5234 44.8259Z" fill="currentColor" mask="url(#path-4-inside-1_493_12801)"/><rect x="39.2876" y="48.7875" width="2.54876" height="11.8973" transform="rotate(-45 39.2876 48.7875)" fill="currentColor"/></svg>
            <div class="p-2 mb-5">
            <p class="explore-title">Get hired!</p>
              <p class="explore-text" class="card-text mt-2">
                Lorem ipsum dolor sit amet, consectetur adipicing elit. Ipsum
                quam inte
              </p>
            </div>
            <p class="explore-link p-2">Learn more 
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clip-path="url(#clip0_428_14145)"> <path d="M8.64046 3.17358L7.70046 4.11358L11.4205 7.84025L3.30713 7.84025L3.30713 9.17358L11.4205 9.17358L7.70046 12.9003L8.64046 13.8403L13.9738 8.50692L8.64046 3.17358Z" fill="currentColor"/></g><defs><clipPath id="clip0_428_14145"><rect width="16" height="16" fill="currentColor" transform="translate(0.640625 0.506958)"/></clipPath></defs></svg>
            </p>
          </div>
             <section class="shape-section">
        <div class="last-number-line"></div>
          <div class="diamond-shape">
            <div class="item-count">6</div>
          </div>
        </section>
      </section>
    </div>
  </div>
</div>

<div class="container-sm g-3 mb-4">
  <p class="intro-title-text">
    Help & <span class="light-blue-bg-text">Support</span>
  </p>
  <div class="row">
    <section class="col-sm-4 p-2">
      <a href="https://discord.com/invite/AZsgcXu">
        <div class="first-row social-hover">
          <img class="banner" src="../assets/img/social.svg" />
          <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1 arrow" width="65" height="65" viewBox="0 0 65 65" fill="none"><path d="M21.4025 21.9783L21.4025 25.7506L36.3443 25.7639L20.0649 42.0434L22.7402 44.7187L39.0196 28.4393L39.033 43.381L42.8052 43.381L42.8052 21.9783L21.4025 21.9783Z" fill="currentColor"/></svg>
           <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1" width="94" height="68" viewBox="0 0 94 68" fill="none"><path d="M69.0674 67.9872C69.0674 67.9872 66.1828 64.5102 63.7873 61.459C74.2838 58.4929 78.2882 51.915 78.2882 51.915C75.404 53.8336 72.3133 55.4213 69.0745 56.648C65.3488 58.2439 61.4506 59.4012 57.4582 60.0966C50.5961 61.3631 43.5583 61.3366 36.706 60.0185C32.6822 59.2334 28.7391 58.079 24.9266 56.5699C22.9178 55.7963 20.9641 54.8859 19.0795 53.8451C18.8385 53.6819 18.5975 53.6038 18.3707 53.4406C18.2498 53.3817 18.1414 53.2998 18.0518 53.1994C16.6343 52.3975 15.8051 51.837 15.8051 51.837C15.8051 51.837 19.6536 58.2233 29.8241 61.3029C27.4002 64.347 24.4376 67.9872 24.4376 67.9872C6.7331 67.3982 0 55.7681 0 55.7681C0 29.9391 11.5384 8.99916 11.5384 8.99916C23.0768 0.335095 34.0553 0.576355 34.0553 0.576355L34.8562 1.54139C20.4332 5.71377 13.7781 12.0504 13.7781 12.0504C13.7781 12.0504 15.5428 11.0853 18.5054 9.72294C27.0812 5.95503 33.8923 4.91193 36.6989 4.67068C37.1465 4.574 37.6021 4.51936 38.0597 4.50747C43.4276 3.80885 48.8596 3.75407 54.2404 4.34426C62.6976 5.31699 70.8834 7.93474 78.3379 12.0504C78.3379 12.0504 72.03 6.03308 58.4079 1.86071L59.5348 0.576355C59.5348 0.576355 70.5062 0.335095 82.0446 8.99916C82.0446 8.99916 93.583 29.9391 93.583 55.7681C93.5547 55.7681 86.772 67.3982 69.0674 67.9872ZM31.8086 30.4997C27.2443 30.4997 23.6367 34.5088 23.6367 39.405C23.6367 44.3011 27.3222 48.3032 31.8086 48.3032C36.295 48.3032 39.9804 44.294 39.9804 39.405C39.9804 34.5159 36.3729 30.4997 31.8086 30.4997ZM61.0515 30.4997C56.4872 30.4997 52.8797 34.5088 52.8797 39.405C52.8797 44.3011 56.5651 48.3032 61.0515 48.3032C65.5379 48.3032 69.2234 44.294 69.2234 39.405C69.2234 34.5159 65.6229 30.4997 61.0515 30.4997Z" fill="currentColor"/></svg>
          <div class="p-1">
            <p class="social" class="card-text mt-2">Join us</p>
            <p class="social-text" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div> 
        </div>
      </a>
    </section>
    <section class="col-sm-4 p-2">
      <a href="https://github.com/reach-sh/reach-lang/discussions">
        <div class="first-row social-hover">
          <img class="banner" src="../assets/img/social.svg" />
          <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1 arrow" width="65" height="65" viewBox="0 0 65 65" fill="none"><path d="M21.4025 21.9783L21.4025 25.7506L36.3443 25.7639L20.0649 42.0434L22.7402 44.7187L39.0196 28.4393L39.033 43.381L42.8052 43.381L42.8052 21.9783L21.4025 21.9783Z" fill="currentColor"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1" width="104" height="104" viewBox="0 0 104 104" fill="none"><g clip-path="url(#clip0_493_12303)"><path d="M69.3332 28.0422H14.3999C10.6232 28.0422 7.5332 31.1322 7.5332 34.9089V96.7089L21.2665 82.9756H69.3332C73.1099 82.9756 76.1999 79.8856 76.1999 76.1089V34.9089C76.1999 31.1322 73.1099 28.0422 69.3332 28.0422ZM69.3332 76.1089H21.2665L14.3999 82.9756V34.9089H69.3332V76.1089Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M93.3666 5.72559H52.1666C49.3341 5.72559 47.0166 8.04309 47.0166 10.8756V30.4456H73.7966V46.9256H88.2166L98.5166 57.2256V10.8756C98.5166 8.04309 96.1991 5.72559 93.3666 5.72559Z" fill="currentColor"/><rect x="25.6665" y="51.5757" width="6" height="6" fill="currentColor"/><rect x="37.6665" y="51.5757" width="6" height="6" fill="currentColor"/><rect x="49.6665" y="51.5757" width="6" height="6" fill="currentColor"/></g><defs><clipPath id="clip0_493_12303"><rect width="103" height="103" fill="currentColor" transform="translate(0.666504 0.575684)"/></clipPath></defs></svg>
          <div class="p-1">
            <p class="social" class="card-text mt-2">Get Help</p>
            <p class="social-text" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div>
        </div>
      </a>
    </section>
    <section class="col-sm-4 p-2">
      <a href="https://github.com/reach-sh/reach-lang">
        <div class="first-row contribute-hover">
          <img class="banner" src="../assets/img/use-white.svg" />
          <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1 arrow" width="65" height="65" viewBox="0 0 65 65" fill="none"><path d="M21.4025 21.9783L21.4025 25.7506L36.3443 25.7639L20.0649 42.0434L22.7402 44.7187L39.0196 28.4393L39.033 43.381L42.8052 43.381L42.8052 21.9783L21.4025 21.9783Z" fill="currentColor"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="img-fluid p-1" width="97" height="97" viewBox="0 0 97 97" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.3148 6.3357C38.0587 6.33965 28.1386 9.99254 20.3291 16.6409C12.5197 23.2892 7.33042 32.4992 5.68972 42.6233C4.04903 52.7473 6.06393 63.1248 11.374 71.8993C16.684 80.6737 24.9427 87.2727 34.6727 90.5156C36.8335 90.9096 37.6215 89.5737 37.6215 88.4348C37.6215 87.4067 37.5846 84.0023 37.5661 80.3948C25.5369 83.005 22.9759 75.2851 22.9759 75.2851C21.0121 70.2925 18.1802 68.9627 18.1802 68.9627C14.2587 66.2848 18.4757 66.3402 18.4757 66.3402C22.8158 66.6418 25.0998 70.7911 25.0998 70.7911C28.9474 77.3905 35.2021 75.4821 37.6646 74.3802C38.0524 71.5914 39.1729 69.683 40.4103 68.6057C30.8127 67.516 20.7104 63.81 20.7104 47.2621C20.6507 42.9681 22.2443 38.8155 25.1614 35.6638C24.712 34.5803 23.2345 30.1848 25.58 24.2379C25.58 24.2379 29.206 23.0744 37.4614 28.6642C44.5423 26.727 52.0135 26.727 59.0943 28.6642C67.3806 23.0867 70.9943 24.2502 70.9943 24.2502C73.3459 30.1971 71.8684 34.5927 71.419 35.6761C74.3371 38.8267 75.929 42.9806 75.8638 47.2744C75.8638 63.8592 65.7615 67.516 56.164 68.581C57.7153 69.9231 59.0943 72.5518 59.0943 76.5841C59.0943 82.3586 59.0451 87.0127 59.0451 88.4348C59.0451 89.586 59.8208 90.9342 62.0124 90.5094C71.7423 87.2617 79.999 80.6576 85.3049 71.8789C90.6109 63.1002 92.6199 52.7199 90.9723 42.5954C89.3248 32.471 84.1283 23.2632 76.3127 16.6198C68.497 9.97634 58.5724 6.33087 48.3148 6.3357Z" fill="currentColor"/></svg>
          <div class="p-1">
            <p class="use-sm" class="card-text mt-2">Contribute</p>
            <p class="use-text-support" class="card-text mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
              quam inte
            </p>
          </div>
        </div>
      </a>
    </section>
  </div>
</div>

<div class="footer"></div>

