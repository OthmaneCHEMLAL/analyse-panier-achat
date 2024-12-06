import { Product } from '../models/products';
import { Sale } from '../models/sales';

export const getTotalSales = async (startDate: Date, endDate: Date) => {
  try {
    const totalSales = await Sale.aggregate([
      {
        $match: {
          Date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$TotalAmount' },
        },
      },
    ]);

    return totalSales[0]?.totalSales || 0;
  } catch (error) {
    console.error('Error fetching total sales:', error);
    throw new Error('Failed to fetch total sales');
  }
};


export const getTrendingProducts = async () => {
  try {
    const trendingProducts = await Sale.aggregate([
      {
        $group: {
          _id: '$ProductID',
          totalQuantity: { $sum: '$Quantity' },
        },
      },
      {
        $lookup: {
          from: 'products',  // 'products' collection
          localField: '_id',
          foreignField: 'ProductID',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $project: {
          name: '$productDetails.ProductName',
          totalQuantity: 1,
          totalSales: { $multiply: ['$totalQuantity', '$productDetails.Price'] },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    return trendingProducts;
  } catch (error) {
    console.error('Error fetching trending products:', error);
    throw new Error('Failed to fetch trending products');
  }
};


export const getCategorySales = async () => {
  try {
    const totalSales = await Sale.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$productDetails.Category',
          totalSalesByCategory: { $sum: '$TotalAmount' },
        },
      },
    ]);

    const totalSalesAmount = totalSales.reduce((acc, item) => acc + item.totalSalesByCategory, 0);

    const categorySalesPercentage = totalSales.map((category) => ({
      category: category._id,
      totalSales: category.totalSalesByCategory,
      percentage: (category.totalSalesByCategory / totalSalesAmount) * 100,
    }));

    return categorySalesPercentage;
  } catch (error) {
    console.error('Error fetching category sales:', error);
    throw new Error('Failed to fetch category sales');
  }
};



export const getProductsData = async () => {
  try {

    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: '$ProductID', 
          total_sales: { $sum: '$TotalAmount' },  
          total_quantity_sold: { $sum: '$Quantity' },  
        },
      },
      {
        $lookup: {
          from: 'products', 
          localField: '_id',
          foreignField: 'ProductID',
          as: 'product_details',
        },
      },
      {
        $unwind: '$product_details',  
      },
      {
        $project: {
          product_name: '$product_details.ProductName',
          price: '$product_details.Price',
          category: '$product_details.Clothing',  
          total_sales: 1,
          total_quantity_sold: 1,
        },
      },
    ]);

    return salesData;
  } catch (err) {
    console.error('Error fetching sales data:', err);
    throw err;
  }
}


async function calculateSalesMetrics() {
  const products = await getProductsData();

  let totalSales = 0;
  let categorySales: Record<string, number> = {};


  products.forEach(product => {
    const salesPerProduct = product.price * product.total_quantity_sold;
    totalSales += salesPerProduct;

    if (!categorySales[product.category]) {
      categorySales[product.category] = 0;
    }
    categorySales[product.category] += salesPerProduct;
  });

  
  const categorySalesPercentage = Object.keys(categorySales).map(category => ({
    category,
    salesPercentage: (categorySales[category] / totalSales) * 100,
  }));

  return { products, totalSales, categorySalesPercentage };
}