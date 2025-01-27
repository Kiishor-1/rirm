const Joi = require('joi');

module.exports.jobValidator = Joi.object({
    job: Joi.object({
        title: Joi.string().required(),
        logoUrl:Joi.string().required(),
        company: Joi.string().required(),
        skills: Joi.array().required(),
        salary:Joi.string().required(),
        site: Joi.string().required(),
        jobType:Joi.string().required(),
        location: Joi.string().required(),
        vacancies:Joi.number().required(),
        description: Joi.string().required(),
        duration: Joi.number().required(),
        about: Joi.string().required(),
        aboutJob: Joi.object({
            description: Joi.string().required(),
            responsibility: Joi.array().required(),
        }),
        additionalInformation: Joi.string().required(),
    })
})