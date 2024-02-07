// https://www.youtube.com/watch?v=NBi0T300Hp0&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7&index=29

// download Algolia
// npm install algoliasearch

import algoliasearch from "algoliasearch";

const client = algoliasearch("W4QGDLA9P1", "9e9f69b862a5b89beeceaaa11f2b193e");

const algolia = client.initIndex("Socialplatform");  // capitalized alphabet matters!

export default algolia;
