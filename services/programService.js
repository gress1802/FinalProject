const Program = require('../models/program');

const programService = {
  async createProgram(programData) {
    try {
      const newProgram = await Program.create(programData);
      return { success: true, program: newProgram };
    } catch (error) {
      console.error('Error creating program:', error);
      return { success: false, error };
    }
  },

  async deleteProgram(programID) {
    try {
      const programToDelete = await Program.findOne({ where: { programID } });

      if (!programToDelete) {
        return { success: false, message: 'Program not found.' };
      }

      await programToDelete.destroy();
      return { success: true, message: 'Program deleted successfully.' };
    } catch (error) {
      console.error('Error deleting program:', error);
      return { success: false, error };
    }
  },

  async getAllPrograms() {
    try {
      const programs = await Program.findAll();
      return programs;
    } catch (error) {
      console.error('Error getting all programs:', error);
      return error;
    }
  },
};

module.exports = programService;
