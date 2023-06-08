const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_body", "user_id", "blog_id"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found" });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/createblog", withAuth, async (req, res) => {
  try {
    const UserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = UserData.get({ plain: true });
    res.render("createblog", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/comments/:blog_id", withAuth, async (req, res) => {
  try {
    const CommentData = await Comment.findAll({
      where: {
        blog_id: req.params.blog_id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!CommentData) {
      res.status(404).json({ message: "No comments found" });
      return;
    }

    const comments = CommentData.map((comment) => comment.get({ plain: true }));

    res.render("comments", {
      comments: comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment/:blog_id", withAuth, async (req, res) => {
  try {
    const BlogData = await Blog.findByPk(req.params.blog_id, {
      include: [{ model: Comment }],
    });

    const blog = BlogData.get({ plain: true });

    res.render("createComment", {
      ...blog,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/createblog");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/signup");
    return;
  }

  res.render("signup");
});

// router.get("*", (req, res) => {
//   res.status(404).send("Can't go there!");
//   // res.redirect('/');
// });

module.exports = router;
