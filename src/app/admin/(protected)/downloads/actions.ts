
'use server';

import { isAdminAuthenticated } from '@/app/actions';
import { connectToDatabase } from '@/lib/mongodb';
import { type AiLog } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getAllAiLogsForDownload(): Promise<{ success: boolean; message?: string; data?: AiLog[] }> {
    noStore();
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        const db = await connectToDatabase();
        const logs = await db.collection<AiLog>('ai_logs')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return { success: true, data: JSON.parse(JSON.stringify(logs)) };

    } catch (error: any) {
        console.error('Error fetching all AI logs for download:', error);
        // Check for the specific MongoDB memory limit error code
        if (error.code === 292) {
             return { success: false, message: 'Database Error: The data is too large to sort in memory. A database index is required on the `createdAt` field for this to work.' };
        }
        return { success: false, message: 'An unexpected error occurred while fetching data.' };
    }
}
