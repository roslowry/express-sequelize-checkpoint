var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/', function(req, res, next) {
  // *** Just a quick note. I think I may need some additiona assistance on routing. I had to try several times before I could actually hit this route.

  Article.findAll().then(function(foundArticles){ //be consistent when you're .thens on new lines
    res.json(foundArticles)//;
  }) // .catch(next);
})//;

router.get('/:id', function(req, res, next){
  Article.findOne({
    where: {
      id: req.params.id
    }
  }) //use Article.findById instead

  .then(function(foundArticle){
    res.json(foundArticle)//;
  })
  // *** By the way, I could use some help with error handling. I'm not too confident with it - Thanks!
  //   // function(error){
  //   //   // res.status(404).end()
  //   // })

  /*

  Okay, so error handling is something we are sending back from our request, so we can think of it as a response.  Since we can only send one response, we need to conditionally choose between a res.json and a res.sendStatus, depending on if we have a foundArticle

  */

  .catch(next)
});

router.post('/', function (req, res, next) {
  Article.create({
    title: req.body.title,
    content: req.body.content
  })//we can just pass req.body here
  .then(function(createdArticle){
    res.json({
      message: 'Created successfully',
      article: createdArticle
    })//;
  })
  .catch(next)//;
})//;

router.put('/:id', function (req, res, next) {
  //can use Article.update here instead of all of this
  Article.findOne({// again, can use .findById()
    where: {
      id: req.params.id
    }
  })
  .then(function(instance){
    //if you return instance.update here, you don't have to nest your .thens
    instance.update({
      title: req.body.title
      }, {
      where: {
        id: req.params.id
      }
    }) //again can just pass req.body
    .then(function(newInstance){
      res.json({
        message: 'Updated successfully',
        article: newInstance
      })//;
    })

    .catch(next)
  })//.catch() should be here
}) //;


module.exports = router;
