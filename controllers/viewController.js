module.exports = {
  showDashboard(req, res) {
    console.log('THEGUYM')
    res.format({
      json() {      
        res.json(res.locals);
      },
      html() {
        res.render('dashboard');
      },

    });
  }
}