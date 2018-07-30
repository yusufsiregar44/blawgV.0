const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const blog = require('../models/blog');
const app = require('../app');

chai.use(chaiHttp);

describe('Blog', function () {
  // before(function (done) {
  //   blog.create({
  //     title: 'et dolor',
  //     content: 'lorem ipsum',
  //     tags: ['culture', 'politics'],
  //     mediaURI: 'http://apakek',
  //     writer: 'TBD',
  //   }, function (err) {
  //     done();
  //   });
  // });
  this.timeout(10000)
  it('should create a SINGLE blog on /blogs POST', function (done) {
    chai.request(app)
      .post('/blogs')
      .send({
        "title": "Tut Wuri Handayani",
        "content": "lorem ipsum",
        "tags": "culture",
        "mediaURI": "http://apakek",
        "writer": "TBD"
      })
      .end(function (err, res) {
        // console.log(res);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('title');
        res.body.title.should.be.a('string');
        res.body.should.have.property('content');
        res.body.content.should.be.a('string');
        res.body.should.have.property('writer');
        res.body.writer.should.be.a('string');
        done();
      });
  });

  it('should read ALL blogs on /blogs GET', function (done) {
    chai.request(app)
      .get('/blogs')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });

  it('should read a SINGLE blog on /blogs/:id GET', function (done) {
    chai.request(app)
      .post('/blogs')
      .send({
        "title": "Tut Wuri Handayani",
        "content": "lorem ipsum",
        "tags": "culture",
        "mediaURI": "http://apakek",
        "writer": "TBD"
      })
      .end(function (err, res) {
        let id = res.body._id;
        chai.request(app)
          .get('/blogs/' + id)
          .end((err2, res2) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('title');
            res.body.title.should.be.a('string');
            res.body.should.have.property('content');
            res.body.content.should.be.a('string');
            res.body.should.have.property('writer');
            res.body.writer.should.be.a('string');
            done();
          });
      });
  });

  it('should update a SINGLE blog on /blogs/:id PUT', function (done) {
    blog.create({
      title: "Tut Wuri Handayani",
      content: "lorem ipsum",
      tags: "culture",
      mediaURI: "http://apakek",
      writer: "TBD",
    }).then((newlyCreatedBlogData) => {
      chai.request(app)
        .put('/blogs/' + newlyCreatedBlogData._id)
        .send({
          'title': 'randomizer'
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('title');
          res.body.title.should.be.a('string');
          res.body.should.have.property('content');
          res.body.content.should.be.a('string');
          res.body.should.have.property('writer');
          res.body.writer.should.be.a('string');
          done();
        });
    });
  });

  it('should delete a SINGLE blog on /blogs/:id DELETE', function (done) {
    blog.create({
      title: 'apakek',
      content: 'lolololol',
      tags: ['comedy', 'nonsense'],
      mediaURI: 'http://heehehehhe',
      writer: '83917918201',
    }).then((newlyCreatedBlogData) => {
      chai.request(app)
      .delete('/blogs/' + newlyCreatedBlogData._id)
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  afterEach(function (done) {
    // console.log('sini===');
    blog.remove({}, function (err) {
      // console.log('sinii----2');
      done();
    });
  });

});
