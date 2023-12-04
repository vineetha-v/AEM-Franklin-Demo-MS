import Scraper from 'website-scraper'; // only as ESM, no CommonJS

const options = {
    urls: ['https://main--aem-franklin-demo-ms--vineetha-v.hlx.live/'],
    directory: './data'
};

// with async/await
await Scraper(options);
// with promise
// scrape(options).then((this.resultData) => { });
