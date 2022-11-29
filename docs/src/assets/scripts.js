const axiosGetData = async (u) => {
  const c = await axios.get(u);
  return c.data;
};
const doc = window.document;
const hh = (x) => x === '' ? '/' : `/${x}/`;

const searchClient = algoliasearch('M53HHHS0ZW', '0cfd8f1c1a0e3cb7b2abd77b831614dc');
const searchIndex = searchClient.initIndex('docs');

const currentPage = {
  folder: null,
  bookPath: undefined,
  hasOtp: false,
};

// let lang = window.navigator.language.split('-')[0];

/*
https://www.freecodecamp.org/news/javascript-debounce-example/
*/
function debounce(fn, timeoutInMilliseconds = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => { fn.apply(this, args); },
      timeoutInMilliseconds
    );
  };
};

const getWinWidthStr = () => {
  const s = window.innerWidth;
  if (s >= 1200) { return 'xl' }
  else if (s >= 992) { return 'lg' }
  else if (s >= 768) { return 'md' }
  else if (s >= 576) { return 'sm' }
  else return 'xs'
}

const maxColWidth = '280px';
let winWidth = getWinWidthStr();

const establishDisplay = () => {
  const search= document.querySelector(".navbar-nav .nav-link")
  const { bookPath, hasOtp } = currentPage;
  establishDisplayFor('book-col', 'div.show-book-col', bookPath);
  establishDisplayFor('otp-col', 'button.show-otp-col', hasOtp);
  if (winWidth == 'sm' || winWidth == 'xs') {
    search.innerHTML= `<i class="fas fa-search fa-lg" id="search-icon"></i>`
  } else {
    search.innerHTML= `<img src="/assets/img/search-light.svg" id="search-icon" alt="search bar">`
  }
};

const establishDisplayFor = (id, selector, property) => {
  if (property === undefined || property === false) {
    return;
  }
  const element = doc.getElementById(id);
  const button = doc.querySelector(selector);
  if (winWidth == 'xl' || winWidth == 'lg' || winWidth == 'md') {
    element.style.maxWidth = maxColWidth;
    element.style.display = 'none';
    button.style.display = 'none';
  } else if (winWidth == 'sm' || winWidth == 'xs') {
    element.style.maxWidth = 'none';
    element.style.display = 'none';
    button.style.display = 'block';
  }

  const prev = localStorage.getItem(id);
  switch (prev) {
    case 'block':
      if (winWidth == 'sm' || winWidth == 'xs'){
        doc.querySelector('.overlay').style.display = "block";
        doc.querySelector('#otp-col section').style.display = "none";
      } else {
        doc.querySelector('#otp-col section').style.display = "block";
      }
      element.style.display = 'block';
      button.style.display = 'none';
      break;

    case 'none':
      element.style.display = 'none';
      button.style.display = 'block';
      break;

    default:
      const { display } = element.style;
      localStorage.setItem(id, display);
      break;
  }
};

window.addEventListener('resize', () => {
  const newWinWidth = getWinWidthStr();
  if (winWidth != newWinWidth) {
    winWidth = newWinWidth;
    establishDisplay();
  }
});

const scrollHandler = (event) => {
  if (doc.querySelectorAll('#otp-col li.dynamic').length == false) {
    event.target.onscroll = null;
  } else {
    const a = doc.createElement('a');
    const arr = doc.querySelectorAll('#otp-col a');
    let t = 'on-this-page';
    for (let i = arr.length - 1; i >= 0; i--) {
      a.href = arr[i].href;
      const h = a.hash;
      const hid = h && h.substring(1);
      const el = hid && doc.getElementById(hid);
      const rect = el && el.getBoundingClientRect();
      if (rect && rect.y <= 80.0) {
        t = el.id;
        break;
      }
    }
    gotoTarget(false, t, false);
  }
}

const scrollPage = (id) => {
  if (id == 'on-this-page') {
    doc.getElementById('page-col').scrollTo(0, 0);
  } else {
    const t = doc.getElementById(id);
    if ( t ) { t.scrollIntoView(); }
  }
};

const updateHistory = (id) => {
  const base = `${window.location.origin}${currentPage.folder}`;
  const p = (id == 'on-this-page') ? base : `${base}#${id}`;
  window.history.pushState(null, '', p);
}

const gotoTarget = async (shallUpdateHistory, t, shouldScroll = true) => {
  if ( shouldScroll ) { scrollPage(t); }
  if ( shallUpdateHistory ) { updateHistory(t); }
  setOtpItemToActive(t);
};

const setOtpItemToActive = (id) => {
  const a = doc.querySelector('#otp-col a.active');
  if ( a ) { a.classList.remove('active'); }
  const link =
    (id === 'on-this-page') ?
      doc.querySelector('#otp-col a[href="#on-this-page"]') :
      doc.querySelector('#otp-col a[href="' + "#" + id + '"]');
  if ( link && link.classList && link.classList.contains('active') === false) {
    link.classList.add('active');
  }
};

const getWebpage = async (folder, hash, shallUpdateHistory) => {
  folder = folder.replace(/index\.html$/, '');
  const url = `${window.location.origin}${folder}`;
  if ( ! folder || ! url ) { throw Error(`getWebpage on undefined`); }

  const [ configJson, pageHtml, otpHtml ] =
    await axiosGetData(`${url}index.md`);

  // Book or different book?
  if (configJson.bookPath !== undefined && configJson.bookPath !== currentPage.bookPath) {
    let bookHtml = doc.createRange().createContextualFragment(await axiosGetData(`${window.location.origin}${hh(configJson.bookPath)}book.html`));
    doc.querySelectorAll('#book-col div.dynamic').forEach(n => n.remove());
    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    insertAfter(bookHtml, document.getElementById("toggle-icon"));

    doc.querySelectorAll("#book-col .chapter-title").forEach((item,index)=>{
      if (winWidth == 'sm' || winWidth == 'xs'){
        item.addEventListener("click", ()=>{
          doc.querySelector('.overlay').style.display = "none";
          doc.querySelector('#book-col').style.display = "none";
        }, false)
      }
      if (index >= 24 && index <= 27){
        if(index === 24){
          item.parentNode.classList.add('first-bottom-chapter')
        }
        item.classList.add('bottom-chapter');
      }
    })

    // On click chapter-icon.
    doc.querySelectorAll('#book-col i.chapter-icon').forEach(el => {
      el.addEventListener('click', (evt) => {
        const item = evt.target;
        const pages = item.closest('div.chapter').querySelector('div.pages');
        const marker = item.nextSibling
        if (item.classList.contains('fa-diamond')) {
          item.classList.remove('fa-diamond');
          item.classList.add('fa-caret-down');
          marker.classList.remove('closed');
          marker.classList.add('opened');
          pages.style.display = 'block';
        } else {
          item.classList.remove('fa-caret-down');
          item.classList.add('fa-diamond');
          marker.classList.remove('opened');
          marker.classList.add('closed');
          pages.style.display = 'none';
        }
      });
    });
  }

  currentPage.bookPath = configJson.bookPath;

  // Write page title
  const ctitle = configJson.title;
  const tspan = doc.querySelector('div#hh-viewer-wrapper span.title');
  tspan.id = configJson.titleId;
  tspan.textContent = ctitle;
  doc.title = `Reach > ${ctitle}`;

  // Update and show/hide edit btn.
  // XXX move into generator
  const github = 'https://github.com/reach-sh/reach-lang/tree/master/docs/src';
  doc.getElementById('edit-btn').href = `${github}${folder}index.md`;

  // Write page html
  const pageDoc = doc.createRange().createContextualFragment(pageHtml);
  doc.querySelector('div#hh-viewer-wrapper div#hh-viewer').textContent = '';
  doc.querySelector('div#hh-viewer-wrapper div#hh-viewer').append(pageDoc);

  // Adjust page title, adding self-reference link
  const theader = doc.querySelector('h1');
  const hlink = theader.querySelector("a");
  theader.remove();
  tspan.appendChild(hlink);
  tspan.class += " refHeader"

  function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
  // If search page.
  const searchInput = doc.getElementById('reach-search-input');
  const { href } = window.location;
  const rawSearchQuery = href.split('search/#search')[1];
  const searchParams = new URLSearchParams(rawSearchQuery);
  const searchQuery = searchParams.get('q');
  if (searchInput) {
    searchInput.focus();
    const searchResultsList = doc.getElementById('search-results-list');
    const search = async (_evt) => {
      const { hits } = await searchIndex.search(searchInput.value);
      const groupedHits= groupBy(hits, (c) => c.pt)
      if ( ! hits.length ) { return; }
      searchResultsList.innerHTML = '';
      Object.entries(groupedHits).forEach(([key, value]) => {
        const p = doc.createElement('p');
        const d = doc.createElement('div');
        p.innerHTML = key
        p.classList.add("search-title");
        d.classList.add("results-list");
        searchResultsList.append(p);
        searchResultsList.append(d);
        value.forEach((hit)=>{
          const sdClasses = [
            'sdRef',
            'sdTerm',
            'sdHeader',
            'sdPara',
            'sdGHDis',
          ];
          const c = sdClasses[hit.t];
          const e = doc.createElement('div');
          const f = doc.createElement('div');
          e.classList.add(c, "result-item");
          const h = (cls, t) => {
            const n = doc.createElement('span');
            n.classList.add(cls);
            n.innerText = t;
            f.appendChild(n);
          };
          const a = doc.createElement('a');
          a.classList.add('pt');
          a.href = hit.objectID;
          if ( c === 'sdRef' ) {
            h('symbol', hit.c);
            h('scope', hit.s);
          } else if ( c === 'sdTerm' ) {
            h('term', hit.c);
          } else if ( c === 'sdHeader' ) {
            h('h', hit.c);
          } else if ( c === 'sdPara' ) {
            h('p', hit.c);
          } else if ( c === 'sdGHDis' ) {
            h('p', hit.c);
          }
          e.appendChild(f)
          e.innerHTML +=`
          <div class="search-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
              <path d="M7 4V0L0 7L7 14V9.9C12 9.9 15.5 11.5 18 15C17 10 14 5 7 4Z" fill="currentColor" />
            </svg>
          </div>
          `
          a.appendChild(e)
          searchResultsList.append(a);
        })
      });
      updateHistory(`search?q=${searchInput.value}`);
      setClickFollowLink();
    };
    searchInput.addEventListener('keyup', debounce(search));
    if (searchQuery) {
      searchInput.value = searchQuery;
      searchInput.dispatchEvent(new KeyboardEvent('keyup'));
    }
  }

  // Write otp html.
  if (configJson.hasOtp) {
    doc.querySelectorAll('#otp-col ul ul.dynamic, #otp-col ul li.dynamic').forEach(n => { n.remove(); });
    const otpUl = doc.querySelector('#otp-col ul');
    const otpDoc = doc.createRange().createContextualFragment(otpHtml);
    const oul = otpDoc.querySelector('ul');
    if ( oul ) {
      oul.querySelectorAll(':scope > li').forEach((el, index) => {
        if (index == 0) {
          const ul = el.querySelector('ul');
          if (ul) {
            otpUl.querySelector('li').append(ul);
          }
        } else {
          otpUl.append(el);
        }
      });
    }
  }
  currentPage.hasOtp = configJson.hasOtp;

  // Adjust active indicators.
  doc.querySelectorAll('a').forEach(el => {
    el.classList.remove('active');
  });

  doc.querySelectorAll(`a[href="${folder}"]`).forEach((el) => {
    el.classList.add('active');
  });

  const el = doc.querySelector(`#book-col a[href="${folder}"]`);
  if (el) {
    const chapter = el.closest('div.chapter');
    const pages = chapter && chapter.querySelector('div.pages');
    if (pages && pages.hasChildNodes()) {
      const icon = chapter.querySelector('i.chapter-icon');
      const marker = icon.nextSibling
      icon.classList.remove('fa-diamond');
      icon.classList.add('fa-caret-down');
      marker.classList.add('opened');
      pages.style.display = 'block';
    }
  }

  // Establish correct display values.
  establishDisplay();

  // Implement next section card 
  const nextChapter= doc.createElement("div")
  nextChapter.classList.add("next-chapter-container")
  const activeIndex= Array.from(doc.querySelectorAll('.chapter-title')).indexOf(doc.querySelector(".active"))
  const nextChapterInfo = await axiosGetData(`${doc.querySelectorAll('.chapter-title')[activeIndex + 1].href}index.md`);
  const nextChapterHtml = doc.createRange().createContextualFragment(nextChapterInfo[1]);
  const firstText = nextChapterHtml.querySelector("p")?.textContent
  const shortDescription = firstText ? firstText.length > 200 ? firstText.substring(0,200) + "..." : firstText.substring(0, firstText.length - 2) : "";
  const excludedChapters=["reach-top", "tuts"]
 
if (!excludedChapters.includes(configJson.titleId) && activeIndex + 1 !==  Array.from(doc.querySelectorAll('.chapter-title')).length){
  nextChapter.innerHTML +=`
  <section class="p-2 next-chapter-card">
    <a href="${doc.querySelectorAll('.chapter-title')[activeIndex + 1].href}">
      <div class="first-row-chapter">
        <div>
          <p>Next DOC</p>
          <p class="mt-2 next-chapter-title">
              ${doc.querySelectorAll('.chapter-title')[activeIndex + 1].textContent}
          </p>
          <div class="next-chapter-content">
          <div>
          ${shortDescription ? `<p class="mt-2">
          ${shortDescription}
          </p>` : ""}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
            <path d="M22.8638 0.727051L18.9118 4.67899L34.5514 20.3466L0.441406 20.3466L0.441406 25.9522L34.5514 25.9522L18.9118 41.6198L22.8638 45.5718L45.2861 23.1494L22.8638 0.727051Z" fill="currentColor"/>
          </svg>
          </div>
        </div>
      </div>
    </a>
</section>
          `
  doc.querySelector('div#hh-viewer-wrapper div#hh-viewer').append(nextChapter);
}
 


  // Display homepage styles.
  doc.querySelector('div#hh-page-header .col').style.display = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? 'block' : 'none' : 'none';
  doc.querySelector('div#hh-page-header').style.cssText = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? '' : 'margin: 0;float:left;border:none' : 'margin: 0;float:left;border:none';
  doc.querySelector('div.show-book-col').style.cssText = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? '' : 'background-color:white;display:block' : 'background-color:white;display:block';
  doc.querySelector('#page-col').style.padding = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? '16px 24px' : '16px 0 0 0' : '16px 0 0 0';
  doc.querySelector('#page-col').style.backgroundColor = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? 'var(--page-col)' : 'var(--light-mode-white)' : 'var(--page-col)';
  doc.querySelector('#page-col .footer').style.margin = configJson.hasPageHeader ? configJson.title !== "Getting Started" ? '0 -24px -16px -24px' : '0' : '0 -24px -16px -24px';
  doc.getElementById('page-col').style.display = 'block';

  // Display OTP.
  if (configJson.hasOtp) {
    doc.getElementById('otp-col').classList.remove('banish');
    doc.querySelector('button.show-otp-col').classList.remove('banish');
  } else {
    doc.getElementById('otp-col').classList.add('banish');
    doc.querySelector('button.show-otp-col').classList.add('banish');
  }

  // Scroll to proper place and update history
  currentPage.folder = folder;
  setClickFollowLink();
  await gotoTarget(shallUpdateHistory, hash ? hash.substring(1) : 'on-this-page');
};

const clickFollowLink = async (evt) => {
  if ( evt.shiftKey || evt.ctrlKey || evt.metaKey ) { return; }
  const t = evt.target.closest('a');
  if (t === null) { return; }
  if ( t.classList && t.classList.contains("copyBtn") ) {
    evt.preventDefault();
    await navigator.clipboard.writeText(t.getAttribute('data-clipboard-text'));
    const id = t.getAttribute('id');
    $(`#${id}`).attr('title', "Copied!")
      .tooltip('enable')
      .tooltip('show');
    const milliseconds = 1000;
    setTimeout(() => {
      $(`#${id}`)
        .tooltip('disable')
        .attr('title', "Copy to clipboard");
    }, milliseconds);
    return;
  }
  const href = t.href;
  const a = doc.createElement('a');
  a.href = href;
  if (a.hostname === window.location.hostname) {
    evt.preventDefault();
    if (currentPage.folder == a.pathname && a.hash) {
      const t = (a.hash === '#on-this-page') ? 'on-this-page' : a.hash.substring(1);
      await gotoTarget(true, t);
    } else {
      await getWebpage(a.pathname, a.hash, true);
    }
  }
};

const setClickFollowLink = () => {
  doc.querySelectorAll('a').forEach((el) => {
    el.addEventListener('click', clickFollowLink);
  });
};

window.onpopstate = function (event) {
  const a = doc.createElement('a');
  a.href = doc.location.href;
  getWebpage(a.pathname, a.hash, false);
};

const makeShowHide = (hideQ, showQ, showId) => {
  const f = (isHide) => {
    const j = (isHide) => isHide ? 'none' : 'block';
    const g = (b) => b ? 'block' : 'none';
    const x = g(isHide); 
    const y = g(! isHide);
    const z = j(isHide);
    const q = isHide ? hideQ : showQ;
    doc.querySelector(q).addEventListener('click', (event) => {
      if (winWidth == 'sm' || winWidth == 'xs') {
        doc.querySelector('.overlay').style.display = z;
      }
      console.log(showId,y)
      console.log(showQ, x)
      doc.getElementById(showId).style.display = y;
      doc.querySelector(showQ).style.display = x;
    });
  };
  f(true);
  f(false);
};

makeShowHide('button.hide-book-icon', 'div.show-book-col', 'book-col');
makeShowHide('button.hide-otp-icon', 'button.show-otp-col', 'otp-col');

doc.getElementById('page-col').addEventListener('scroll', scrollHandler);

getWebpage(window.location.pathname, window.location.hash, true);
