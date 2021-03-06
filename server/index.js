import express from 'express';
import elasticsearch from 'elasticsearch';
import url from 'url';
import bodyParser from 'body-parser';

import queryBase from './queryBasic.json';  // Query DSL to construct /get queries

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error',
});

const getQuery = (params) => {
  const queryBuilder = queryBase;
  // var ingredients = "chicken,basil"
  queryBuilder.body.query.bool.must = [];
  queryBuilder.body.query.bool.should = [];
  queryBuilder.body.query.bool.must_not = [];
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
  if (params.query.dateRange !== undefined){
    let dateRange = params.query.dateRange.split('-val-').shift().split('-');
    queryBuilder.body.query.bool.must.push(
      {
        range: {
          [params.query.dateRange.split('-val-').pop()]: {
            from: dateRange[0],
            format: "dd/MM/yyyy||yyyy"
          }
        },
        range: {
          [params.query.dateRange.split('-val-').pop()]: {
            to: dateRange[1],
            format: "dd/MM/yyyy||yyyy"
          }
        }
      }
    );
    console.log(JSON.stringify(queryBuilder));
  }
  if (params.query.query !== undefined) {
    queryBuilder.body.query.bool.should.push(
      { term: { ref: params.query.query } }
    );
    queryBuilder.body.query.bool.should.push(
      { term: { staff_surname: params.query.query } }
    );
    queryBuilder.body.query.bool.should.push(
      { term: { child_surname: params.query.query } }
    );
  }
  return queryBuilder;
};

app.get('/get', (req, res) => {
  const query = getQuery(url.parse(req.url, true), queryBase);
  client.search(query).then((body) => {
    const hits = body.hits.hits;
    if (hits) {
      res.send(hits.map(hit => hit._source));
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
    body:{ doc: req.body }
  }, (elasticErr, elasticRes) => {
    if (elasticErr) {
      res.status(elasticRes.status);
      res.send(`Failed to update: ${elasticRes.error}`);
      return;
    }
    res.send('Successful');
  });
});

app.get('/', (req, res) => {
  const message = 'Welcome to the elasticchildprotectionservice api.\n\n to query use ' +
    'with this same url add /get? and your query. \n for example: \n CURRENT_URL/get?ref=24863' +
    '\n CURRENT_URL/get?childSurname=smith&staffSurname=James' +
    ' \n\n see documentation for more';
  res.send(message);
});

const server = app.listen(8085, () => {
  console.log(`Server Running on http;//localhost:${server.address().port}`);
});
