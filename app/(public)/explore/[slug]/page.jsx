'use client'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react'
import React from 'react'

const DynamicExplorePage = () => {
    const data = useQuery(api.events.getFeaturedEvents);
  return (
    <div>DynamicExplorePage


    </div>
  )
}

export default DynamicExplorePage