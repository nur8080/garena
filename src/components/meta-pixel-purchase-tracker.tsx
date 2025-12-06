
'use client';

import { useEffect } from 'react';
import { getOrdersForUser } from '@/app/actions';
import type { User, Order } from '@/lib/definitions';

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

interface MetaPixelPurchaseTrackerProps {
  user: User;
}

const TRACKED_ORDERS_SESSION_KEY = 'meta_pixel_tracked_orders';

export default function MetaPixelPurchaseTracker({ user }: MetaPixelPurchaseTrackerProps) {

  useEffect(() => {
    const checkOrdersAndTrack = async () => {
      if (!user || typeof window.fbq !== 'function') {
        return;
      }

      const orders = await getOrdersForUser();
      
      // Get the list of already tracked order IDs from session storage
      let trackedOrderIds: string[];
      try {
        trackedOrderIds = JSON.parse(sessionStorage.getItem(TRACKED_ORDERS_SESSION_KEY) || '[]');
        if (!Array.isArray(trackedOrderIds)) {
          trackedOrderIds = [];
        }
      } catch {
        trackedOrderIds = [];
      }
      
      const newTrackedIds = [...trackedOrderIds];

      for (const order of orders) {
        // We only care about successful orders that haven't been tracked yet.
        if ((order.status === 'Completed' || order.status === 'Processing') && !trackedOrderIds.includes(order._id.toString())) {
          
          console.log(`Firing Meta Pixel 'Purchase' event for order: ${order._id}`);
          
          // Fire the Meta Pixel event
          window.fbq('track', 'Purchase', {
            value: order.finalPrice,
            currency: 'INR',
            content_name: order.productName,
            content_ids: [order.productId],
            content_type: 'product',
          });

          // Add the order ID to our list of newly tracked IDs for this run
          newTrackedIds.push(order._id.toString());
        }
      }
      
      // If we tracked new orders, update session storage
      if (newTrackedIds.length > trackedOrderIds.length) {
        sessionStorage.setItem(TRACKED_ORDERS_SESSION_KEY, JSON.stringify(newTrackedIds));
      }
    };

    // Run the check shortly after the component mounts
    const timer = setTimeout(checkOrdersAndTrack, 3000); // 3-second delay to ensure fbq is ready

    return () => clearTimeout(timer);
  }, [user]);

  // This component does not render anything
  return null;
}
