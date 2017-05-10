'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
  // ,
  // version: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: return this.numUpdates()
  // }

  /* Close! We just have to set the defaultValue to 0 */
},
{
  getterMethods: {
    snippet: function() {
      if (!this.content) return '';
      return this.content.slice(0, 23) + '...' //watch your semicolon usage
    }
  },
  instanceMethods: {
    truncate: function(length) {
      this.content = this.content.slice(0, length);
    }
  },
  classMethods: {
    findByTitle: function(title){
      return this.findOne({
        where: {
          title: title
        }
      }) //;
    }
  },
  hooks: {
    // numUpdates: function() {
    //
    // }
    /*Look over hooks in the Sequelize Docs: http://docs.sequelizejs.com/en/v3/docs/hooks/
    We have to start our hooks with the type of hook they are, so sequelize knows when to call them.  for this one, we need to start with beforeUpdate, then we can define a function that takes an article as an arg, and increments the version of that article.
    */
  }
}
);

Article.belongsTo(User, { as: 'author' })

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
