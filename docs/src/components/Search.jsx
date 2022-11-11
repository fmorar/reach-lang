"use strict";
const e = React.createElement;

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(null);
  const searchClient = algoliasearch('M53HHHS0ZW', '0cfd8f1c1a0e3cb7b2abd77b831614dc');
  const searchIndex = searchClient.initIndex('docs');

const algoliaSearch= async (searchValue)=>{
    setSearchQuery(searchValue)
   const { hits } = await searchIndex.search(searchValue);
   setSearchResults(hits)
}
 

  return (
    <div className="row justify-content-md-center mt-4">
  <div className="col-md-10 col-lg-8">
    <div className="input-group">
      <input id="search-input" type="text" value={searchQuery} className="form-control" onChange={(event)=> algoliaSearch(event.target.value)} placeholder="Type 'tokens' or 'steps' or 'interact'" aria-label=""/>
    </div>
    <ol id="search-results-list"></ol>
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