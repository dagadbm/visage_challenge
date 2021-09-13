const { Buffer } = require('buffer');

const { Candidate } = require("../db/models");

exports.getAllCandidates = async (req, reply) => {
    const candidates = await Candidate.findAll({
        attributes: ['id', 'name', 'jobTitle', 'notes'],
    });

    return candidates.reduce((acc, candidate) => {
        acc[candidate.id] = candidate;
        return acc;
    }, {});
}

exports.getCandidate = async (req, reply) => {
    const candidate = await Candidate.findOne({
        where: { id: req.params.id },
    });

    return {
        id: candidate.id,
        name: candidate.name,
        jobTitle: candidate.jobTitle,
        notes: candidate.notes,
        document: Buffer.from(candidate.document).toString('base64'),
    };
}

exports.addCandidate = async (req, reply) => {
    const candidate = await Candidate.create({
        ...req.body,
        document: Buffer.from(req.body.document, 'base64'),
    });

    await candidate.save();

    return {
        id: candidate.id,
        name: candidate.name,
        jobTitle: candidate.jobTitle,
        notes: candidate.notes,
        document: req.body.document,
    };
}

exports.updateCandidate = async (req, reply) => {
    const candidate = await Candidate.findOne({
        where: { id: req.params,id },
    });

    Object.keys(req.body).forEach(key => candidate[key] = req.body[key]);
    if (req.body.document) {
        candidate.document = Buffer.from(req.body.document, 'base64');
    }
    await candidate.save();

    return {
        id: candidate.id,
        name: candidate.name,
        jobTitle: candidate.jobTitle,
        notes: candidate.notes,
        document: Buffer.from(candidate.document).toString('base64'),
    };
}
