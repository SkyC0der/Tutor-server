const Subject = require('../models/subject');
const Category = require('../models/category');

exports.createSubject = (req, res) => {
    const categoryTitle = req.params.category;
    const subjectName = req.body.name;

    const createSubject = () => {
        const newSubject = new Subject({ name: subjectName })
        return newSubject.save()
    }

    createSubject()
    .then(createdSubject => {
        if (createdSubject) {
            try {
                Category.findOne({title: categoryTitle})
                .then(foundCategory => {
                    foundCategory.subjects.push(createdSubject);
                    foundCategory.save((err) => {
                        if(!err) {
                            res.json({
                                message: 'Subject created successfullly',
                                data: createdSubject.title
                            })
                        }
                    });
                })
            } catch (error) {
                res.json({
                    message: 'Error!',
                    error
                })
            }
        }
    })
}