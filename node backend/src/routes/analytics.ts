import express, { Request, Response } from 'express';
import { getTotalSales, getTrendingProducts, getCategorySales ,getProductsData} from '../scripts/functions';

const router = express.Router();


router.get('/trending_products', async (req, res) => {
    try {
        const trendingProducts = await getTrendingProducts();
        res.json({ trendingProducts });
    } catch (error) {
        res.status(500).send('Error fetching trending products');
    }
});


router.get('/category_sales', async (req, res) => {
    try {
        const categorySales = await getCategorySales();
        res.json({ categorySales });
    } catch (error) {
        res.status(500).send('Error fetching category sales');
    }
});



    router.get('/products', async (req, res) => {
    try {
        const products = await getProductsData();
        res.json({ products });
    } catch (error) {
        res.status(500).send('Error fetching category sales');
    }
});



router.get('/total_sales', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            res.status(400).send('Start date and end date are required');
            return; 
        }

        if (typeof startDate === 'string' && typeof endDate === 'string') {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                res.status(400).json({ message: "Invalid date format" });
                return; 
            }

            const totalSales = await getTotalSales(start, end);
            res.json({ totalSales });
        } else {
            res.status(400).send('Invalid query parameters');
        }
    } catch (error) {
        console.error('Error fetching total sales:', error);
        res.status(500).send('Error fetching total sales');
    }
});

export default router;
