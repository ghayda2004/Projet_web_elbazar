import { db, getNextOrderId } from '../models/database.js';

// Create order
export const createOrder = (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
      id: getNextOrderId(),
      userId: req.user.id,
      items,
      total,
      status: 'pending',
      createdAt: new Date(),
    };

    db.orders.push(newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's orders
export const getUserOrders = (req, res) => {
  try {
    const userOrders = db.orders.filter(o => o.userId === req.user.id);
    res.json(userOrders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get seller's orders
export const getSellerOrders = (req, res) => {
  try {
    // Get all orders that contain products from this seller
    const sellerProducts = db.products.filter(p => p.sellerId === req.user.id);
    const sellerProductIds = sellerProducts.map(p => p.id);

    const sellerOrders = db.orders.filter(order => 
      order.items.some(item => sellerProductIds.includes(item.productId))
    );

    res.json(sellerOrders);
  } catch (error) {
    console.error('Get seller orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (seller only)
export const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const orderIndex = db.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    db.orders[orderIndex].status = status;
    db.orders[orderIndex].updatedAt = new Date();

    res.json({
      message: 'Order status updated successfully',
      order: db.orders[orderIndex],
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
