const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    // show create view
    create(req, res, next) {
        res.render('courses/create');
    }
    //create model course
    store(req, res, next) {
        let formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => console.log(err));
    }
}

module.exports = new CourseController();
