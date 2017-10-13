# @neoskop/uptrends-api

An implementation of the [Uptrends API](https://www.uptrends.de/support/kb/api/dokumentation) for NodeJS (and Browser).

Master
[![Travis master][travis-master-image]][travis-master-url]
[![Test coverage master][coveralls-master-image]][coveralls-master-url]
[![Known Vulnerabilities master][snyk-master-image]][snyk-master-url]

Develop
[![Travis develop][travis-develop-image]][travis-develop-url]
[![Test coverage develop][coveralls-develop-image]][coveralls-develop-url]
[![Known Vulnerabilities develop][snyk-develop-image]][snyk-develop-url]

## Installation

```sh
yarn add @neoskop/uptrends-api
```

## Usage

```typescript
import { UptrendsAPI } from '@neoskop/uptrends-api'

const api = new UptrendsAPI({ username: 'foo', password: 'bar' });

api.getProbeGroups().then(groups => {
    console.log(groups);
}, err => {
    console.err(err);
});
```

## Testing

```sh
yarn test
```

## Building

```sh
yarn run build
```

## License

[MIT](./LICENSE)

## Sponsor

[![Neoskop GmbH][neoskop-image]][neoskop-url]

[travis-master-image]: https://img.shields.io/travis/neoskop/uptrends-api/master.svg
[travis-master-url]: https://travis-ci.org/neoskop/uptrends-api
[travis-develop-image]: https://img.shields.io/travis/neoskop/uptrends-api/develop.svg
[travis-develop-url]: https://travis-ci.org/neoskop/uptrends-api
[snyk-master-image]: https://snyk.io/test/github/neoskop/uptrends-api/master/badge.svg
[snyk-master-url]: https://snyk.io/test/github/neoskop/uptrends-api/master

[coveralls-master-image]: https://coveralls.io/repos/github/neoskop/uptrends-api/badge.svg?branch=master
[coveralls-master-url]: https://coveralls.io/github/neoskop/uptrends-api?branch=master
[coveralls-develop-image]: https://coveralls.io/repos/github/neoskop/uptrends-api/badge.svg?branch=develop
[coveralls-develop-url]: https://coveralls.io/github/neoskop/uptrends-api?branch=develop
[snyk-develop-image]: https://snyk.io/test/github/neoskop/uptrends-api/develop/badge.svg
[snyk-develop-url]: https://snyk.io/test/github/neoskop/uptrends-api/develop

[neoskop-image]: ./neoskop.png
[neoskop-url]: https://www.neoskop.de/

