const blog = require('../models/blog');

class BlogController {
  static create(req, res) {
    blog.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      mediaURI: req.body.mediaURI,
      writer: req.body.writer,
      // writer field will be changed with req.header.token which will then be decryppted to obtain _id pf user
    }, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static readAll(req, res) {
    blog.find({}, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static readById(req, res) {
    blog.findById(req.params.id, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static updateById(req, res) {
    blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      mediaURI: req.body.mediaURI,
      writer: req.body.writer,
    }, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static deleteById(req, res) {
    blog.findByIdAndDelete(req.params.id, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }
}

module.exports = BlogController;
