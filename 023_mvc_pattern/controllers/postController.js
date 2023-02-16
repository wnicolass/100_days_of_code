const Post = require("../models/post");

class PostController {
  getHome(req, res) {
    res.render("welcome");
  }

  async getAdmin(req, res) {
    if (!res.locals.isAuth) {
      return res.status(401).render("401");
    }

    const posts = await Post.fetchAll();
    let sessionInputData = req.session.inputData;

    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        title: "",
        content: "",
      };
    }

    req.session.inputData = null;

    res.render("admin", { posts: posts, inputData: sessionInputData });
  }

  async createPost(req, res) {
    const { title, content } = req.body;

    if (!title || !content || title.trim() === "" || content.trim() === "") {
      req.session.inputData = {
        hasError: true,
        message: "Invalid input - please check your data.",
        title: title,
        content: content,
      };

      return res.redirect("back");
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

    let sessionInputData = req.session.inputData;
    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        title: post.title,
        content: post.content,
      };
    }

    req.session.inputData = null;

    res.render("single-post", { post: post, inputData: sessionInputData });
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content || title.trim() === "" || content.trim() === "") {
      req.session.inputData = {
        hasError: true,
        message: "Invalid input - please check your data.",
        title,
        content,
      };

      res.redirect(`/posts/${req.params.id}/edit`);
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
