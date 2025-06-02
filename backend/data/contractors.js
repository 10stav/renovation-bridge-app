// In-memory contractor database (for now)
// Later we'll move this to MongoDB

const contractors = [
  {
    id: 1,
    name: 'John Contractor',
    email: 'john.contractor@email.com', // Replace with real email
    phone: '+1234567890',
    specialties: ['kitchen', 'bathroom', 'general'],
    active: true,
  },
  {
    id: 2,
    name: 'Sarah Builder',
    email: 'sarah.builder@email.com', // Replace with real email
    phone: '+1234567891',
    specialties: ['flooring', 'electrical', 'plumbing'],
    active: true,
  },
  {
    id: 3,
    name: 'Mike Renovator',
    email: 'mike.renovator@email.com', // Replace with real email
    phone: '+1234567892',
    specialties: ['roofing', 'exterior', 'landscaping'],
    active: true,
  },
  {
    id: 4,
    name: 'Angry Contractor',
    email: 'angrycontractor7253@gmail.com', // ← Change to your email
    phone: '+1234567890',
    specialties: ['kitchen', 'bathroom', 'general'],
    active: true,
  }
];

// Get all active contractors
const getActiveContractors = () => {
  return contractors.filter(contractor => contractor.active);
};

// Add new contractor
const addContractor = (contractorData) => {
  const newContractor = {
    id: contractors.length + 1,
    ...contractorData,
    active: true,
  };
  contractors.push(newContractor);
  return newContractor;
};

module.exports = {
  getActiveContractors,
  addContractor,
  contractors,
};