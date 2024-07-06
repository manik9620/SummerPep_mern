import React from 'react'
import { useParams } from 'react-router-dom'

function ProductInfo() {
const params=useParams();

  return (
    <div>
      <h1>Info page {JSON.stringify(params)}</h1>
    </div>
  )
}

export default ProductInfo;
