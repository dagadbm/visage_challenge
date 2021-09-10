const { Candidate } = require("../db/models");

// get all post 
exports.getAllCandidates = async (req, reply) => {
    return await Candidate.findAll({
        attributes: ['id', 'name', 'jobTitle', 'notes'],
    });
}

// get single post by id
exports.getCandidate = async (req, reply) => {
    return await Candidate.findOne({
        where: { id: req.params.id },
    });
}

exports.addCandidate = async (req, reply) => {
    return await Candidate.create({
        ...req.body,
    });
}

exports.updateCandidate = async (req, reply) => {
    const candidate = await Candidate.findOne({
        where: { id: req.params,id },
    });

    Object.keys(req.body).forEach(key => candidate[key] = req.body[key]);
    await candidate.save();

    return candidate;
}
