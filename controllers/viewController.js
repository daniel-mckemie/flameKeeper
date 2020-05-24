module.exports = {
  dashboard(req, res) {
    res.format({
      json() {
        res.json(res.locals);
      },
      html() {
        res.redirect('dashboard');
      },

    });
  },
}