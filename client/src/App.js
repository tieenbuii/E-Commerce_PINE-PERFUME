import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "pages/public";
import {
  AdminLayout,
  Dashboard,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
} from "pages/admin";
import { MemberLayout, Personal } from "pages/member";
import path from "ultils/path";
import { getCategories } from "store/asynActions";
import { useDispatch } from "react-redux";
import { Dashboard } from "pages/admin";
import { Modal } from "components";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        {/* Trên phần path.FINAL_REGISTER */}

        {/* REGITER */}
        {/* end register */}
      </Routes>
    </div>
  );
}

export default App;
