const router = require('express').Router();
const { Blog } = require('../../models/blog');
const withAuth = require('../../utils/auth');

//// get all blogs////
router.get('/', withAuth, async (req, res) => {
  try {
      const blogData = await Blog.findAll();
      res.status(200).json(blogData);
  } catch (err) {
      res.status(500).json(err);
  }
});


//// post new blog/////
router.post('/', withAuth, async (req, res) => {
   try {
      const newBlog = await Blog.create({
        ...req.body,
        blog_id: req.session.blog_id,
      })
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //// update a blog/////
  router.put('/:id', withAuth, async (req, res) => {
    try {
    Blog.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.params.user_id,
        },
      }
    )
      .then((updatedBlog) => {
        res.json(updatedBlog);
      });
      
    }  catch(err) {
        res.json(err);
      };
  });
  

  //// delete blog //////
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;