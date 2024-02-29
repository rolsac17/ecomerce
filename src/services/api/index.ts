const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  address: {
    getCountries: `${API}/api/countries`,
    getStateByCountry: (idCountry: string): string =>
      `${API}/api/countries/${idCountry}/states`,
    getCitiesByState: (idState: string): string =>
      `${API}/api/states/${idState}/cities`,
  },
  otp: {
    sendOtp: `${API}/api/send-otp`,
  },
  signup: `${API}/api/signup`,
  login: {
    singin: `${API}/api/login`,
  },
  options: `${API}/common/users/options`,
  users: {
    getUsers: (type: string, status: string, offset: number, limit: number) =>
      `${API}/admin/users?type=${type}&status=${status}&name=&offset=${offset}&limit=${limit}`,
    save: `${API}/admin/users`,
    update: (id: any) => `${API}/admin/contacts/${id}`,
    authorizationWarehouse: `${API}/admin/users/authorize-warehouse`,
    changeStatus: (id: any, status: any) =>
      `${API}/admin/users/${id}/${status}`,
    currentUser: `${API}/common/current_user`,
    createClient: `${API}/users/clients`,
    resetPassword: `${API}/api/reset-password`,
  },
  categories: {
    getCategories: `${API}/api/categories`,
    saveCategorie: `${API}/admin/categories`,
  },
  subCategories: {
    getsubcategories: (category: string) =>
      `${API}/api/subcategories/${category}`,
    saveSubCategory: `${API}/admin/subcategories`,
  },
  files: {
    download: `${API}/api/files`,
    upload: `${API}/common/files`,
  },
  products: {
    getInitialProdutcs: `${API}/api/products`,
    changeAvailability: (id: any) =>
      `${API}/warehouse/products/availability/${id}`,
    getProductById: (id: any) => `${API}/api/products/${id}`,
  },
  coupons: {
    validate: `${API}/coupons/validate`,
    getCupons: `${API}/warehouse/coupons`,
  },
  orders: {
    createOrder: `${API}/api/orders`,
    getOrders: `${API}/common/orders`,
    getOrdersAdmin: (state: boolean, warehouse: any, limit: any) =>
      `${API}/common/orders?limit=${limit}&send=${state}${
        warehouse !== '' ? '&warehousesId=' + warehouse : ''
      }&offset=0&limit=100`,
    getProducts: `${API}/api/products`,
    public: (orderId: string, email?: string) =>
      `${API}/api/public/orders?orderId=${orderId}&email=${email ? email : ''}`,
  },

  wharehouses: {
    authorize: `${API}/admin/users/authorize-warehouse`,
    updateProduct: (id: any) => `${API}/warehouse/products/${id}`,
  },
  incomes: {
    getProduct: (warehouse: string, code: any) =>
      `/warehouse/products/${warehouse}/${code}`,
  },
  reports: {
    getProducts: `${API}/warehouse/reports/products`,
    getUsers: (type: string) => `${API}/admin/reports/users/${type}`,
    getTotal: (wid: string) => `${API}/admin/earningswh/total-balance/${wid}`,
    getTotalPaid: (wid: string) => `${API}/admin/earningswh/total-paid/${wid}`,
    getPaymentsMade: `${API}/admin/earningswh/payments-made`,
    getPaymentsMadeSeller: `${API}/admin/earningseller/payments-made`,
  },
  transports: {
    get: `${API}/common/transport-companies`,
    crud: `${API}/admin/transport-companies`,
  },
  shipmentsDelivered: `${API}/warehouse/shipments/delivered`,
  shipments: `${API}/warehouse/shipments`,
  warrantyIssues: (id: string) => `${API}/warehouse/shipments/warrantly/${id}`,
  shipmentsByOrder: (order: string) => `${API}/common/shipments/${order}`,
  changeStatusShipment: (id: number, status: string) =>
    `${API}/warehouse/shipments/${id}/${status}`,
  events: {
    getEvents: `${API}/api/events`,
    crud: `${API}/admin/events`,
  },
  dashboard: {
    delivered: `${API}/common/dashboard/delivered`,
    returned: `${API}/common/dashboard/returned`,
    sends: `${API}/common/dashboard/sends`,
    graphics: `${API}/common/dashboard/graphics`,
    orders: `${API}/common/dashboard/orders`,
    details: (startDate: string, endDate: string, status: string) =>
      `${API}/common/dashboard/detail/${startDate}/${endDate}/${status}`,
  },
  email: {
    send: `${API}/admin/send_email`,
  },
  payments: {
    warehouse: `${API}/warehouse/warehouses_payments/history_by_warehouses`,
    makePaymentWarehouse: `${API}/warehouse/warehouses_payments/make_payment`,
    paymentsInProcess: `${API}/admin/warehouses_payments/history?status=IN_PROCESS`,
    approvePayments: (id: any) =>
      `${API}/admin/warehouses_payments/approve_payment/${id}`,
    seller: `${API}/common/seller_payments/detail-movements`,
    request_payment: `${API}/common/seller_payments/request-payment`,
    requested_payment: `${API}/admin/seller_payments/requested-payments?status=IN_PROCESS`,
    seller_payment: (id: any) =>
      `${API}/admin/seller_payments/payment-done/${id}`,
  },
  followUp: {
    shipments: `${API}/common/follow-up/shipments`,
    notes: (id: any) => `${API}/common/follow-up/notes/${id}`,
    addNote: `${API}/common/follow-up/add-note`,
  },
  isSolvent: `${API}/warehouse/solvency`,
  Links: {
    seller: `${API}/common/link/seller`,
    warehouse: `${API}/common/link/warehouse`,
  },
  banks: {
    get: `${API}/common/banks`,
    admin: `${API}/admin/banks`,
  },
  wishList: {
    getAll: `${API}/common/wish_lists`,
    addDetailWishlist: `${API}/common/wish_list_detail`,
    deleteDetailWishlist: (wishlistId: number, productId: number) =>
      `${API}/common/wish_list_detail/${wishlistId}/${productId}`,
    getByID: (id: string) => `${API}/api/wish_lists/${id}`,
  },
  profile: {
    update: `${API}/common/profile`,
  },
  shipmentsPublicByOrderId: (id: string) =>
    `${API}/api/public/shipments?orderId=${id}`,
};

export default endPoints;
