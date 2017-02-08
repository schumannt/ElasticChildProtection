const elasticsearch = require('elasticsearch');

const dataFile = './dataFile.json';
const mappingFile = './demo-mapping.json';

const mapping = JSON.parse(require('fs').readFileSync(mappingFile, 'utf8'));
const data = JSON.parse(require('fs').readFileSync(dataFile, 'utf8'));

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

client.ping({
  requestTimeout: 30000,
}, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  }
});

client.indices.delete({ index: 'allegations' });

client.indices.create({ index: 'allegations', type: 'allegation', body: mapping });

const bulk = [];
let counter = 1;
data.map((line) => {
  bulk.push(
    { index: { _index: 'allegations', _type: 'allegation', _id: counter } }
  );
  bulk.push(line);
  counter++;
});

client.bulk({ body: bulk }, (err, result) => {
  if (err) {
    console.error(err);
  } if (result) {
    console.log(`Processed ${counter} records. To Index`);
  }
});

