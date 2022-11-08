"use strict";
const e = React.createElement;

const LikeButton = () => {
  const [starsSelected, selectStar] = React.useState(null);

  return (
    <div className="container-sm g-3 mb-4">
      <div className="row">
        <section className="col-sm-5 p-2">
          <p className="explore-title-text">Get Reach Updates</p>
          <p>
            You will be notified with Reach updates, news and announcements.
          </p>
          <div class="buttonIn">
        <input type="email" id="enter"/>
        <button id="clear">SIGN UP</button>
          </div>
        </section>
        <section className="col-sm-2 p-2">
          <div className="first-row-footer">
            <div
              className="p-1 footer-card"
              onClick={() => starsSelected === null && selectStar(0)}
            >
              {starsSelected === null && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="img-fluid p-1 arrow"
                    width="47"
                    height="48"
                    viewBox="0 0 47 48"
                    fill="none"
                  >
                    <path
                      d="M15.6324 16.297L15.6324 19.0522L26.5455 19.0619L14.6554 30.952L16.6094 32.906L28.4995 21.0159L28.5093 31.929L31.2644 31.929L31.2644 16.297L15.6324 16.297Z"
                      fill="#999999"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="37"
                    viewBox="0 0 183 37"
                    fill="none"
                  >
                    <path
                      d="M51.6941 8.76512L53.6552 14.8008L53.8797 15.4918H54.6062H60.9525L55.8183 19.222L55.2305 19.649L55.455 20.34L57.4161 26.3757L52.2819 22.6454L51.6941 22.2184L51.1063 22.6454L45.9721 26.3757L47.9332 20.34L48.1577 19.649L47.5699 19.222L42.4357 15.4918H48.7819H49.5085L49.733 14.8008L51.6941 8.76512Z"
                      stroke="#999999"
                      strokeWidth="2"
                    />
                    <path
                      d="M91.5001 3.90111L94.5533 13.2978L94.7778 13.9888H95.5043H105.385L97.3913 19.7962L96.8035 20.2233L97.028 20.9143L100.081 30.3109L92.0879 24.5035L91.5001 24.0764L90.9123 24.5035L82.919 30.3109L85.9722 20.9143L86.1967 20.2233L85.6089 19.7962L77.6156 13.9888H87.4959H88.2224L88.4469 13.2978L91.5001 3.90111Z"
                      fill="#999999"
                      stroke="#999999"
                      strokeWidth="2"
                    />
                    <path
                      d="M131.306 8.76512L133.267 14.8008L133.492 15.4918H134.218H140.564L135.43 19.222L134.842 19.649L135.067 20.34L137.028 26.3757L131.894 22.6454L131.306 22.2184L130.718 22.6454L125.584 26.3757L127.545 20.34L127.77 19.649L127.182 19.222L122.047 15.4918H128.394H129.12L129.345 14.8008L131.306 8.76512Z"
                      stroke="#999999"
                      strokeWidth="2"
                    />
                  </svg>
                </>
              )}
              <p className="footer-card-text mt-2">
                How satisfied are you with the docs?
              </p>
              {starsSelected !== null && (
                <div className="star-rating">
                  {[...Array(5)].map((n, i) => (
                    <div
                      className={i < starsSelected ? "star selected" : "star"}
                      key={i}
                      onClick={() => selectStar(i + 1)}
                    ></div>
                  ))}
                  <button className="star-button">Submit</button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="col-sm-2 p-2">
          <a href="/search/#search">
            <div className="first-row-footer">
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="img-fluid p-1 arrow"
                    width="47"
                    height="48"
                    viewBox="0 0 47 48"
                    fill="none"
                  >
                    <path
                      d="M15.6324 16.297L15.6324 19.0522L26.5455 19.0619L14.6554 30.952L16.6094 32.906L28.4995 21.0159L28.5093 31.929L31.2644 31.929L31.2644 16.297L15.6324 16.297Z"
                      fill="#999999"
                    />
                  </svg>
              <div className="p-1 footer-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                >
                  <rect
                    x="2.68797"
                    y="2.68748"
                    width="25.5317"
                    height="25.5317"
                    stroke="#999999"
                    strokeWidth="4.37496"
                  />
                  <mask id="path-2-inside-1_494_15610" fill="white">
                    <path d="M8.47559 12.4629L18.4445 12.4629L18.4445 22.4318L8.47559 22.4318L8.47559 12.4629Z" />
                  </mask>
                  <path
                    d="M8.47559 22.4318L6.7256 22.4318L6.7256 24.1818L8.47559 24.1818L8.47559 22.4318ZM18.4445 20.6818L8.47559 20.6818L8.47559 24.1818L18.4445 24.1818L18.4445 20.6818ZM10.2256 22.4318L10.2256 12.4629L6.7256 12.4629L6.7256 22.4318L10.2256 22.4318Z"
                    fill="#999999"
                    mask="url(#path-2-inside-1_494_15610)"
                  />
                  <rect
                    x="25.9331"
                    y="28.8564"
                    width="4.13359"
                    height="19.2951"
                    transform="rotate(-45 25.9331 28.8564)"
                    fill="#999999"
                  />
                </svg>
                <p className="footer-card-text mt-2">
                  Can you find what you're looking for?
                </p>
              </div>
            </div>
          </a>
        </section>
        <section className="col-sm-2 p-2">
          <a href="/tut/#tuts">
            <div className="first-row-footer">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="img-fluid p-1 arrow"
                    width="47"
                    height="48"
                    viewBox="0 0 47 48"
                    fill="none"
                  >
                    <path
                      d="M15.6324 16.297L15.6324 19.0522L26.5455 19.0619L14.6554 30.952L16.6094 32.906L28.4995 21.0159L28.5093 31.929L31.2644 31.929L31.2644 16.297L15.6324 16.297Z"
                      fill="#999999"
                    />
                  </svg>
              <div className="p-1 footer-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="46"
                  viewBox="0 0 35 46"
                  fill="none"
                >
                  <path
                    d="M0.229492 0.5H23.96L34.7705 11.0469V45.5H0.229492V0.5Z"
                    fill="#999999"
                  />
                  <rect
                    x="22.7295"
                    y="0.5"
                    width="1.23047"
                    height="11.6895"
                    fill="#F2F2F2"
                  />
                  <rect
                    x="34.7705"
                    y="11.0469"
                    width="1.23047"
                    height="12.041"
                    transform="rotate(90 34.7705 11.0469)"
                    fill="#F2F2F2"
                  />
                  <rect
                    x="5.50293"
                    y="15.0898"
                    width="15.7324"
                    height="2.54883"
                    fill="#F2F2F2"
                  />
                  <rect
                    x="5.50293"
                    y="37.9414"
                    width="15.7324"
                    height="2.54883"
                    fill="#F2F2F2"
                  />
                  <rect
                    x="5.50293"
                    y="22.1211"
                    width="23.7305"
                    height="2.54883"
                    fill="#F2F2F2"
                  />
                  <rect
                    x="5.50293"
                    y="30.0312"
                    width="23.7305"
                    height="2.54883"
                    fill="#F2F2F2"
                  />
                </svg>
                <p className="footer-card-text mt-2">
                  Found an issue? Help us improve this page
                </p>
              </div>
            </div>
          </a>
        </section>
      </div>
    </div>
  );
};

