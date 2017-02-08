// import express from 'express';
var express = require('express');

const app = express();

app.get('/keepalive', (req, res) => {
  res.send('keepalive');
});

const webpage = app.listen(3030, () => {
  console.log(`webpage Running on http://localhost:${webpage.address().port}`);
});