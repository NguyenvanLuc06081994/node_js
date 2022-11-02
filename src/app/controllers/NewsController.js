class NewsController {
   
    index(req, res){
        res.render('news');
    }

    // news/:slug
    show(req, res){
        res.send('detail');
    }

}

module.exports = new NewsController;