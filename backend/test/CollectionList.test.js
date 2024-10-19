import { addCollection } from '../controllers/collectionController';
import collectionModel from '../models/collectionModel';

// Mocking the collectionModel
jest.mock('../models/collectionModel');

describe('addCollection API', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Location 1',
        wasteType: 'Plastic',
        date: '2024-10-12',
        address: '123 Ocean Ave',
        reason: 'Garbage Cleanup',
        userId: 'user123'
      }
    };

    res = {
      json: jest.fn(),
    };
  });

  it('should add collection successfully', async () => {
    // Mock the save method to simulate successful collection save
    collectionModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValueOnce({})
    }));

    await addCollection(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'collection added successfully'
    });
  });

  it('should return error if adding collection fails', async () => {
    // Simulate error during save
    collectionModel.mockImplementation(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error('Save error'))
    }));

    await addCollection(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error adding collection'
    });
  });
});
