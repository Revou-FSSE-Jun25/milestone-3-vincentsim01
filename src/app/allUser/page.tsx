"use client"

import UserList from '@/app/component/UserList'

const page = () => {
  return (
    <div>
         <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
            onClick={() => window.location.href = '/products/create'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Product
          </button>

        <UserList/>
        
    </div>
  )
}

export default page
