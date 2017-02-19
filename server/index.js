import express from 'express';
import elasticsearch from 'elasticsearch';
import url from 'url';
import bodyParser from 'body-parser';

import queryBase from './queryBasic.json';  // Query DSL to construct /get queries

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error',
});

const getQuery = (params) => {
  const queryBuilder = queryBase;
  queryBuilder.body.query.bool.must = [];
  queryBuilder.body.query.bool.should = [];
  queryBuilder.body.query.bool.must_not = [];
  if (params.query.offset !== undefined) {
    queryBuilder.from = params.query.offset;
  }
  if (params.query.limit !== undefined) {
    queryBuilder.size = params.query.limit;
  }
  if (params.query.childSurname !== undefined) {
    queryBuilder.body.query.bool.must.push(
      { term: { child_surname: params.query.childSurname.toLowerCase() } }
    );
  }
  if (params.query.staffSurname !== undefined) {
    queryBuilder.body.query.bool.must.push(
      { term: { staff_surname: params.query.staffSurname.toLowerCase() } }
    );
  }
  if (params.query.ref !== undefined) {
    queryBuilder.body.query.bool.must.push(
      { term: { ref: params.query.ref } }
    );
  }
  if (params.query.dateRange !== undefined) {
    const dateRange = params.query.dateRange.split('-val-').shift().split('-');
    queryBuilder.body.query.bool.must.push(
      {
        range: {
          [params.query.dateRange.split('-val-').pop()]: {
            from: dateRange[0],
            format: 'dd/MM/yyyy||yyyy'
          }
        }
      }
    );
    queryBuilder.body.query.bool.must.push(
      {
        range: {
          [params.query.dateRange.split('-val-').pop()]: {
            to: dateRange[1],
            format: 'dd/MM/yyyy||yyyy'
          }
        }
      }
    );
  }
  if (params.query.wild !== undefined) {
    queryBuilder.body.query.bool.should.push(
      { term: { _all: params.query.wild.toLowerCase() } }
    );
  }
  return queryBuilder;
};

app.use(express.static('../app'));

app.get('/get', (req, res) => {
  const query = getQuery(url.parse(req.url, true), queryBase);
  client.search(query).then((body) => {
    const hits = body.hits.hits;
    const response = {
      total: body.hits.total,
      pages: Math.round(body.hits.total/queryBase.size),
      results: hits.map(hit => hit._source)
    };
    if (hits) {
      res.send(response);
    } else {
      res.send('Sorry, no Results');
    }
  }, (error) => {
    res.status(error.status);
    res.error(`The request could not be processed. ${error}`);
  });
});

app.post('/new', (req, res) => {
  client.create({
    index: 'allegations',
    type: 'allegation',
    id: req.body.ref,
    body: req.body
  }, (elasticErr, elasticRes) => {
    if (elasticErr) {
      res.status(elasticRes.status);
      res.send(`Failed to create: ${elasticRes.error}`);
      return;
    }
    res.send('Successful');
  });
});

app.post('/update', (req, res) => {
  client.update({
    index: 'allegations',
    type: 'allegation',
    id: req.body.ref,
    body: { doc: req.body, doc_as_upsert: true }
  }, (elasticErr, elasticRes) => {
    if (elasticErr) {
      res.status(elasticRes.status);
      res.send(`Failed to update: ${elasticRes.error}`);
      return;
    }
    res.send('Successful');
  });
});

app.post('/update', (req, res) => {
  client.update({
    index: 'allegations',
    type: 'allegation',
    id: req.body.ref,
    body: { doc: req.body }
  }, (elasticErr, elasticRes) => {
    if (elasticErr) {
      res.status(elasticRes.status);
      res.send(`Failed to update: ${elasticRes.error}`);
      return;
    }
    res.send('Successful');
  });
});

app.get('/info', (req, res) => {
  const message = 'Welcome to the elasticchildprotectionservice api.\n\n to query use ' +
    'with this same url add /get? and your query. \n for example: \n CURRENT_URL/get?ref=24863' +
    '\n CURRENT_URL/get?childSurname=smith&staffSurname=James' +
    ' \n\n see documentation for more';
  res.send(message);
});

const server = app.listen(8085, () => {
  console.log(`Server Running on http://localhost:${server.address().port}`);
});
