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
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => console.log(err));
    }

    //[GET] courses/:id/edit
    edit(req, res, next) {
        let id = req.params.id;
        Course.findById(id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    //[PUT] courses/:id
    update(req, res, next) {
        let id = req.params.id;
        Course.updateOne({ _id: id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[PATCH] courses/:id/restore
    restore(req, res, next) {
        let id = req.params.id;
        Course.restore({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] courses/handle-form-action
    handleFormAction(req, res, next) {
        Course.delete({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] courses/:id
    destroy(req, res, next) {
        let id = req.params.id;
        Course.delete({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] courses/:id
    forceDelete(req, res, next) {
        let id = req.params.id;
        Course.deleteOne({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
