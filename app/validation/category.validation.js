const checkNotEmptyCategory = (req, res, next) => {
  const { name, status } = req.body;
  let listErrors = [];
  if (name == '') {
    listErrors.push('Tên Danh Mục Không Được Để Trống');
    req.flash('errors', { msg: 'Tên Danh Mục Không Được Để Trống' });
  }
  if (status == '') {
    listErrors.push('Status is required');
    req.flash('errors', { msg: 'Trạng Thái Không Được Để Trống' });
  }
  if (listErrors.length) {
    res.redirect('/admin/category/create');
  } else {
    next();
  }
};

module.exports = {
  checkNotEmptyCategory,
};
