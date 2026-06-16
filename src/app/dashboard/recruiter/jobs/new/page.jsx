import React from 'react';
import NewJobPostForm from './NewJobPostForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async() => {
    const company = await getLoggedInRecruiterCompany();
    console.log(company, 'post job')
    return (
        <div>
            <NewJobPostForm company={company}></NewJobPostForm>
        </div>
    );
};

export default PostJobPage;