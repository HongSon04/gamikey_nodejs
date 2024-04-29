class ProductVariantItemController {
  index(req, res) {
    const variant_id = req.params.variant_id;
    res.render('admin/pages/product/variant-items/index.ejs', {
      productVariants: '',
      variant_id,
      pageTitle: 'Danh Sách Mục Biến Thể Sản Phẩm',
      route: 'product_variant_item',
      success: req.flash('success'),
    });
  }
}

module.exports = new ProductVariantItemController();
