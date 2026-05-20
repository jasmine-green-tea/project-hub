import InstituteRepository from '../repositories/institute.repository.js';
import DirectionRepository from '../repositories/direction.repository.js';
import DepartmentRepository from '../repositories/department.repository.js';

class ReferenceController {
  async getInstitutes(req, res, next) {
    try {
      const institutes = await InstituteRepository.getAll();
      res.json(institutes);
    } catch (err) {
      next(err);
    }
  }

  async getDirections(req, res, next) {
    try {
      const { instituteId } = req.query;
      let directions;
      if (instituteId) {
        directions = await DirectionRepository.getByInstituteId(instituteId);
      } else {
        directions = await DirectionRepository.getAll();
      }
      res.json(directions);
    } catch (err) {
      next(err);
    }
  }

  async getDepartments(req, res, next) {
    try {
      const { instituteId } = req.query;
      let departments;
      if (instituteId) {
        departments = await DepartmentRepository.getByInstituteId(instituteId);
      } else {
        departments = await DepartmentRepository.getAll();
      }
      res.json(departments);
    } catch (err) {
      next(err);
    }
  }
}

export default new ReferenceController();
