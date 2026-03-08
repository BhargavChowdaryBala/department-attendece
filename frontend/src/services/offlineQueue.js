/**
 * Service to manage offline attendance scans using localStorage.
 */

const QUEUE_KEY = 'attendance_offline_queue';

/**
 * Get all queued scans.
 * @returns {Array<{rollNo: string, timestamp: number}>}
 */
export const getOfflineQueue = () => {
    try {
        const queue = localStorage.getItem(QUEUE_KEY);
        if (!queue) return [];
        
        const parsed = JSON.parse(queue);
        const isValidQueue =
            Array.isArray(parsed) &&
            parsed.every(
                (item) =>
                    item &&
                    typeof item === 'object' &&
                    typeof item.rollNo === 'string' &&
                    typeof item.timestamp === 'number'
            );
            
        if (!isValidQueue) {
            console.warn('Invalid offline queue data found in localStorage, resetting to empty array');
            localStorage.setItem(QUEUE_KEY, JSON.stringify([]));
            return [];
        }
        return parsed;
    } catch (e) {
        console.error('Failed to get offline queue', e);
        return [];
    }
};

/**
 * Add a scan to the offline queue.
 * @param {string} rollNo 
 */
export const addToOfflineQueue = (rollNo) => {
    try {
        const queue = getOfflineQueue();
        // Check if already in queue to avoid duplicates
        if (!queue.find(item => item.rollNo === rollNo)) {
            queue.push({
                rollNo,
                timestamp: Date.now()
            });
            localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
        }
    } catch (e) {
        console.error('Failed to add to offline queue', e);
    }
};

/**
 * Remove a specific scan from the queue after successful sync.
 * @param {string} rollNo 
 */
export const removeFromQueue = (rollNo) => {
    try {
        let queue = getOfflineQueue();
        queue = queue.filter(item => item.rollNo !== rollNo);
        localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {
        console.error('Failed to remove from offline queue', e);
    }
};

/**
 * Clear the entire offline queue.
 */
export const clearOfflineQueue = () => {
    try {
        localStorage.removeItem(QUEUE_KEY);
    } catch (e) {
        console.error('Failed to clear offline queue', e);
    }
};
