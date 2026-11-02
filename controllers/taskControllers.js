const AppError = require('../utils/AppError');
const HttpStatus = require('../utils/httpStatus');
const Task = require('../models/taskModel');
const catchAsync = require('../middleware/catchAsync');

exports.getAllTask = catchAsync(async (req, res, next) => {
  const query = Task.find();
  const allTask = await query.select('-__v');
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'Data fetched successfully',
    data: {
      users: allTask,
      totalUsers: allTask.length,
      currentDate: new Date().toISOString(),
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await Task.findById(id).exec();
  if (!user) {
    return next(new AppError('User Not Found', HttpStatus.NOT_FOUND));
  }
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'User fetched successfully',
    user,
  });
});

exports.postUser = catchAsync(async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.designation) {
    return next(new AppError('User name and designation required', HttpStatus.BAD_REQUEST));
  }
  const newUser = await Task.create({ ...body });
  res.status(HttpStatus.CREATED).json({
    status: 'success',
    message: 'User created successfully',
    user: newUser,
  });
});

exports.patchUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!user) {
    return next(new AppError('User Not Found', HttpStatus.NOT_FOUND));
  }
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'User updated successfully',
    user,
  });
});

exports.putUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (!body.name || !body.designation) {
    return next(new AppError('User name and designation required', HttpStatus.BAD_REQUEST));
  }
  const user = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true, overwrite: true });
  if (!user) {
    return next(new AppError('User Not Found', HttpStatus.NOT_FOUND));
  }
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'User updated successfully',
    user,
  });
});

exports.getUserByParams = catchAsync(async (req, res, next) => {
  const { designation, id } = req.query;
  let query = {};
  if (designation) query.designation = designation;
  if (id) query._id = id;
  if (!designation && !id) {
    return next();
  }
  const foundUser = await Task.findOne(query);
  if (!foundUser) {
    return next(new AppError('User Not Found', HttpStatus.NOT_FOUND));
  }
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'User fetched successfully',
    user: foundUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await Task.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError('User Not Found', HttpStatus.NOT_FOUND));
  }
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'User deleted successfully',
    user,
  });
});
