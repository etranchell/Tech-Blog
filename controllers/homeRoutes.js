const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
            // attributes: ['id', 'title', 'content'],
            include: [
                {
                    // model: Comment,
                    // attributes: [
                    //     'id',
                    //     'comment_body',
                    //     'user_id',
                    //     'blog_id'
                    // ],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
            ],
        })

        const blog = blogData.map((blog) => blog.get({ plain: true }));

        res.render('feed', {
            blog
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'content'],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_body',
                        'user_id',
                        'blog_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })

        if (!blogData) {
            res.status(404).json({ message: "No blog found" });
            return;
        }
    
        const blog = blogData.get({ plain: true });

        // res.render('view', {
        //     blog
        // });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
    // res.redirect('/');
});


module.exports = router;