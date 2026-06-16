import { requireRole } from '@/lib/core/session';
import React from 'react';

const adminDashboardLayout = async({children}) => {
    await requireRole('admin')
    return children;
};

export default adminDashboardLayout;