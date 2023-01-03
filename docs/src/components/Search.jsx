"use strict";
const e = React.createElement;

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(null);
    const searchClient = algoliasearch('M53HHHS0ZW', '0cfd8f1c1a0e3cb7b2abd77b831614dc');
    const searchIndex = searchClient.initIndex('docs');

    function groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    const algoliaSearch = async (searchValue) => {
        setSearchQuery(searchValue)
        const { hits } = await searchIndex.search(searchValue);
        setSearchResults(groupBy(hits, (c) => c.pt))
    }

    return (
        <div className="row justify-content-md-center mt-4">
            <div className="col-md-10">
                <div className="input-group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M17.6486 15.8108L16.5384 15.8108L16.1448 15.4313C17.5221 13.8292 18.3513 11.7492 18.3513 9.48645C18.3513 4.44105 14.2616 0.351318 9.21619 0.351318C4.17078 0.351318 0.0810547 4.44105 0.0810547 9.48645C0.0810547 14.5319 4.17078 18.6216 9.21619 18.6216C11.4789 18.6216 13.5589 17.7924 15.1611 16.4151L15.5405 16.8086L15.5405 17.9189L22.5675 24.9319L24.6616 22.8378L17.6486 15.8108ZM9.21619 15.8108C5.71673 15.8108 2.89187 12.9859 2.89187 9.48645C2.89187 5.98699 5.71673 3.16213 9.21619 3.16213C12.7156 3.16213 15.5405 5.98699 15.5405 9.48645C15.5405 12.9859 12.7156 15.8108 9.21619 15.8108Z" fill="#666666" />
                    </svg>
                    <input id="reach-search-input" type="text" value={searchQuery} className="form-control" onChange={(event) => algoliaSearch(event.target.value)} placeholder="Search" aria-label="" />
                    <svg onClick={() => setSearchQuery("")} xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <path d="M14.1357 1.41L12.7257 0L7.13574 5.59L1.54574 0L0.135742 1.41L5.72574 7L0.135742 12.59L1.54574 14L7.13574 8.41L12.7257 14L14.1357 12.59L8.54574 7L14.1357 1.41Z" fill="#323232" />
                    </svg>
                </div>
                <div id="search-results-list" style={{visibility: searchQuery ? 'visible' : 'hidden'}}></div>
            </div>
        </div>
    );
};

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

waitForElm(".search-modal").then((elm) => {
    const domContainer = document.querySelector(".search-modal");
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(Search));
});