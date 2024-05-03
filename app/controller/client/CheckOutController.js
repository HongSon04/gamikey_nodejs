const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const Order = require('../../model/order.model');
const OrderBill = require('../../model/order_bill.model');
const ProductAccount = require('../../model/product_account.model');
const sendMailVerify = require('../../helper/send-mail');
const ejs = require('ejs');
const Coupon = require('../../model/coupon.model');

class CheckOutController {
  // ? [GET] /checkout
  async index(req, res) {
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Get All Carts
    const carts = req.session.cart || [];
    const code = req.session.coupon || '';
    if (carts.length == 0) {
      req.flash('errors', 'Giỏ hàng của bạn đang trống');
      return res.redirect('/cart');
    }

    const userInfo = req.headers.authorization || '';

    res.render('client/pages/checkout/index.ejs', {
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'checkout',
      userInfo,
      carts,
      code,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }
  // ? [GET] /checkout/success
  async checkout(req, res) {
    const { payment_method, name, phone, email } = req.body;
    if (name === '' || phone === '' || email === '') {
      req.flash('errors', 'Vui lòng điền đầy đủ thông tin');
      return res.redirect('/checkout');
    }
    if (payment_method == '' || payment_method == null) {
      req.flash('errors', 'Vui lòng chọn phương thức thanh toán');
      return res.redirect('/checkout');
    }
    if (payment_method == 'momo') {
      req.session.userCheckout = {
        name: name,
        phone: phone,
        email: email,
      };
      return res.redirect('/momo-payment');
    }
  }
  // ? [GET] /checkout/
  async paymentSuccess(req, res) {
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    const userInfo = req.headers.authorization;
    res.render('client/pages/checkout/payment-success.ejs', {
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'checkout',
      userInfo,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // !! MOMO PAYMENT
  // ? [GET] /momo-payment
  async momoPayment(req, res) {
    //parameters
    let userInfo = req.session.userCheckout;
    let carts = req.session.cart || [];
    let total = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
    let code = req.session.coupon || '';
    let finalAmount = 0;
    if (total) {
      if (code) {
        if (code.discountType === 'percentage') {
          finalAmount = total - (total * code.discountAmount) / 100;
        } else {
          finalAmount = total - code.discountAmount;
        }
      } else {
        finalAmount = total;
      }
    }
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = `Thanh Toán Đơn Hàng cho: ${userInfo.name}`;
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000/momo-success';
    var ipnUrl = 'http://localhost:3000/momo-success';
    var requestType = 'payWithMethod';
    var amount = finalAmount;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var paymentCode =
      'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    var signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response
    const reqq = https.request(options, (ress) => {
      ress.setEncoding('utf8');
      ress.on('data', (body) => {
        const response = JSON.parse(body);
        if (ress.statusCode === 200 && response.payUrl) {
          console.log('Payment request successful!');
          res.redirect(response.payUrl);
        } else {
          res.redirect('/checkout');
        }
      });
      ress.on('end', () => {
        console.log('No more data in response.');
      });
    });

    reqq.write(requestBody);
    reqq.end();
  }
  // ? [GET] /momo-success
  async momoSuccess(req, res) {
    const { orderId } = req.query;
    const carts = req.session.cart || [];
    const code = req.session.coupon || '';
    const userInfo = req.session.userCheckout;
    const total = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
    // ? Storage Bill
    await storageBill(orderId, 'momo', carts, code, userInfo, total);
    // ? Delete Session
    deleteSession(req);
    // ? Flash Message
    req.flash('success', 'Thanh Toán Đơn Hàng Thành Công');
    return res.redirect('/checkout/success');
  }
}

// ? Storage Bill
async function storageBill(
  invoice_id,
  payment_method,
  carts,
  code,
  userInfo,
  total,
) {
  let finalAmount = 0;
  let discountAmount = 0;
  let totalQuantityProduct = carts.reduce(
    (acc, cart) => acc + cart.quantity,
    0,
  );

  if (code.discountType === 'percentage') {
    discountAmount = (total * code.discountAmount) / 100;
  } else {
    discountAmount = code.discountAmount;
  }

  if (total) {
    if (code) {
      if (code.discountType === 'percentage') {
        finalAmount = total - (total * code.discountAmount) / 100;
      } else {
        finalAmount = total - code.discountAmount;
      }
    } else {
      finalAmount = total;
    }
  }
  const order = new Order();
  order.invoice_id = invoice_id;
  order.customer_name = userInfo.name ?? 'Khách Hàng';
  order.customer_email = userInfo.email;
  order.customer_phone = userInfo.phone;
  order.sub_total = total;
  order.discount_amount = discountAmount;
  order.total_amount = finalAmount;
  order.product_quantity = totalQuantityProduct;
  order.payment_method = payment_method;
  order.coupon = code;
  order.order_status = 1;
  await order.save();
  let accountStore = [];
  let codeStore = [];
  carts.forEach(async (cart) => {
    // ? Storage Order Bill
    const orderBill = new OrderBill();
    orderBill.order_id = order.id;
    orderBill.product_id = cart.id;
    orderBill.product_name = cart.name;
    orderBill.product_price = cart.price;
    orderBill.quantity = cart.quantity;
    await orderBill.save();

    // ? Increase Purchased Product and Decrease Quantity Product
    const product = await Product.findById(cart.id);
    product.purcharsed += parseInt(cart.quantity);
    product.quantity -= parseInt(cart.quantity);
    await product.save();

    // ? Find Coupon and Decrease Quantity
    if (code) {
      const codeQuantity = await Coupon.findOne({ code: code.code });
      codeQuantity.quantity -= 1;
      await codeQuantity.save();
    }

    // ? Get ProductAccount By id Product where used_by_email = null and order_id = null
    const productAccounts = await ProductAccount.find({
      product_id: cart.id,
      used_by_email: null,
      order_id: null,
    }).limit(cart.quantity);
    productAccounts.forEach(async (productAccount) => {
      console.log(productAccount);
      if (
        productAccount.code == null &&
        productAccount.username != null &&
        productAccount.password != null
      ) {
        const productAccountItem = await ProductAccount.findById(
          productAccount.id,
        );
        productAccountItem.used_by_email = userInfo.email;
        productAccountItem.order_id = order.id;
        const username = productAccountItem.username;
        const password = productAccountItem.password;
        accountStore.push({ username, password });
        await productAccountItem.save();
      } else {
        const productAccountItem = await ProductAccount.findById(
          productAccount.id,
        );
        productAccountItem.used_by_email = userInfo.email;
        productAccountItem.order_id = order.id;
        const code = productAccountItem.code;
        codeStore.push(code);
        await productAccountItem.save();
      }
    });

    // ? Send Mail
    const subject = 'Thanh Toán Đơn Hàng Thành Công';
    const email = userInfo.email;
    const html = await ejs.renderFile(`views/email/order-email.ejs`, {
      email: email,
      name: userInfo.name,
      invoice_id: invoice_id,
      total: finalAmount,
      products: carts,
      accountStores: accountStore,
      codeStores: codeStore,
    });
    await sendMailVerify(email, subject, html);
  });
}
// ? Delete Session
function deleteSession(req) {
  req.session.cart = [];
  req.session.coupon = '';
  req.session.userCheckout = '';
}
module.exports = new CheckOutController();
