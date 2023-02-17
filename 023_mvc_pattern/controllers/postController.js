const Post = require("../models/post");
const {
  getSessionErrorData,
  flashErrorsToSession,
} = require("../utils/session-validation");
const { isValidPost } = require("../utils/validation");
const { doubleCsrf } = require("csrf-csrf");
const { options } = require("../configs/csrfOptions");
const { generateToken } = doubleCsrf(options);

class PostController {
  getHome(req, res) {
    res.render("welcome");
  }

  async getAdmin(req, res) {
    if (!res.locals.isAuth) {
      return res.status(401).render("401");
    }

    const posts = await Post.fetchAll();
    const sessionInputData = getSessionErrorData(req, {
      title: "",
      content: "",
    });
    const csrfToken = generateToken(res, req);
    res.render("admin", {
      posts: posts,
      inputData: sessionInputData,
      csrfToken,
    });
  }

  async createPost(req, res) {
    const { title, content } = req.body;

    if (!isValidPost(req.body)) {
      flashErrorsToSession(
        req,
        { title, content, message: "Invalid input data - Check your data." },
        () => {
          res.redirect("back");
        }
      );
      return;
    }

    const post = new Post(title, content);
    await post.save();

    return res.redirect("back");
  }

  async getSinglePost(req, res) {
    const id = req.params;
    const post = new Post(null, null, id);
    await post.fetchOne();

    if (!post.title || !post.content) {
      return res.status(404).render("404");
    }

    const sessionInputData = getSessionErrorData(req, {
      title: post.title,
      content: post.content,
    });
    const csrfToken = generateToken(res, req);
    res.render("single-post", {
      post: post,
      inputData: sessionInputData,
      csrfToken,
    });
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!isValidPost(req.body)) {
      flashErrorsToSession(
        req,
        {
          message: "Invalid input - please check your data.",
          title,
          content,
        },
        () => {
          res.redirect(`/posts/${req.params.id}/edit`);
        }
      );

      return;
    }

    const post = new Post(title, content, id);
    await post.update();
    res.redirect("/admin");
  }

  async deletePost(req, res) {
    const { id } = req.params;
    const post = new Post(null, null, id);
    await post.delete();
    return res.redirect("/admin");
  }
}

module.exports = new PostController();
