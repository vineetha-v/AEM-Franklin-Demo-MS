import Scraper from 'website-scraper'; // only as ESM, no CommonJS

const options = {
    urls: ['https://main--ossmobiledemo--vineetha-v.hlx.page/'],
    directory: './data'
};

// with async/await
await Scraper(options);
// with promise
// scrape(options).then((this.resultData) => { });
