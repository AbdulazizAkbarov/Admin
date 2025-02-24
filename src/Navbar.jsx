import { Button } from 'antd'
import React from 'react'

function Navbar({collapsed,setCollapsed}) {
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };
  return (
    <nav className="bg-slate-800 text-white flex  justify-between px-8 py-2 text-xl ">
        <div className="flex gap-4">
          <div>Logo</div>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? "Och" : "Yop"}
          </Button>
        </div>
        <div>Avatar</div>
      </nav>
  )
}

export default Navbar