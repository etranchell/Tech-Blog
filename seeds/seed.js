const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");
const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const getRandomUserId = (users) => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex].id;
};

const getRandomBlogId = (blogs) => {
  const randomIndex = Math.floor(Math.random() * blogs.length);
  return blogs[randomIndex].id;
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogs) {
    const randomUserId = getRandomUserId(users);

    await blog.update({
      user_id: randomUserId,
    });
  }

  for (const comment of commentData) {
    const randomUserId = getRandomUserId(users);
    const randomBlogId = getRandomBlogId(blogs);

    await Comment.create({
      ...comment,
      user_id: randomUserId,
      blog_id: randomBlogId,
    });
  }

  process.exit(0);
};

seedDatabase();