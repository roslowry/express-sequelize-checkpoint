var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/', function(req, res, next) {
  // *** Just a quick note. I think I may need some additiona assistance on routing. I had to try several times before I could actually hit this route.
  Article.findAll().then(function(foundArticles){
    res.json(foundArticles)
  })
})

router.get('/:id', function(req, res, next){
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(foundArticle){
    res.json(foundArticle)
  })
  // *** By the way, I could use some help with error handling. I'm not too confident with it - Thanks!
  //   // function(error){
  //   //   // res.status(404).end()
  //   // })

  .catch(next)
});

router.post('/', function (req, res, next) {
  Article.create({
    title: req.body.title,
    content: req.body.content
  })
  .then(function(createdArticle){

    res.json({
      message: 'Created successfully',
      article: createdArticle
    })
  })
  .catch(next)
})

router.put('/:id', function (req, res, next) {
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(instance){
    instance.update({
      title: req.body.title
      }, {
      where: {
        id: req.params.id
      }
    })
    .then(function(newInstance){
      res.json({
        message: 'Updated successfully',
        article: newInstance
      })
    })
    .catch(next)
  })
})


module.exports = router;
