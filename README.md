# API Request

[![Latest Stable Version](https://img.shields.io/npm/v/@pollen-solutions/js-api-request.svg?style=for-the-badge)](https://packagist.org/packages/pollen-solutions/js-api-request)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE.md)

## Installation

```shell
npm i @pollen-solutions/js-api-request
```

## Usage 

This documentation uses the [API JSON placeholder](https://jsonplaceholder.typicode.com/guide/).

### Basic Usage

```javascript
import {ApiRequest} from "@pollen-solutions/js-api-request"

ApiRequest(
    'https://jsonplaceholder.typicode.com/posts', /** Endpoint url */
    {_start:0, _limit:5}, /** Data request arguments */
    'GET', /** HTTP Request Method */
    {'X-CUSTOM-HEADER': 'My Custom Header'},  /** HTTP Headers */
    function(json) { 
      console.log(json)
    }, /** Callback function for processing the response in JS format */
    true /** Debug mode enabled */
)
```

### Using promise return

```javascript
import {ApiRequest} from "@pollen-solutions/js-api-request"

ApiRequest('https://jsonplaceholder.typicode.com/posts', {
  _start: 0,
  _limit: 5
})
    .then(json => console.log(json))
    .finally(() => console.log('ApiRequest complete'))
```


### For a specific HTTP verb 

#### GET Request

```javascript
import {ApiGet} from "@pollen-solutions/js-api-request"

ApiGet('https://jsonplaceholder.typicode.com/posts').then(json => console.log(json))
```

#### POST Request

```javascript
import {ApiPost} from "@pollen-solutions/js-api-request"

ApiPost('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1,
}).then(json => console.log(json))
```

#### PUT Request

```javascript
import {ApiPut} from "@pollen-solutions/js-api-request"

ApiPut('https://jsonplaceholder.typicode.com/posts/1', {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1,
}).then(json => console.log(json))
```

#### PATCH Request 

```javascript
import {ApiPatch} from "@pollen-solutions/js-api-request"

ApiPatch('https://jsonplaceholder.typicode.com/posts/1', {
  title: 'foo',
}).then(json => console.log(json))
```

#### DELETE Request

```javascript
import {ApiDelete} from "@pollen-solutions/js-api-request"

ApiDelete('https://jsonplaceholder.typicode.com/posts/1')
```