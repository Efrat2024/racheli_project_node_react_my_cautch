
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

const HomeLazy = React.lazy(() => import("./Components/Home"))
const HelloLazy = React.lazy(() => import("./Components/hello"))
const RegisterLazy = React.lazy(() => import("./Components/register"))
const LoginLazy = React.lazy(() => import("./Components/login"))
const UserCouchesLazy = React.lazy(() => import("./Components/userCouches"))
const AdminCouchesLazy = React.lazy(() => import("./Components/adminCouches"))
const UpdateCouchLazy = React.lazy(() => import("./Components/updateCouch"))
const AddCouchLazy = React.lazy(() => import("./Components/addCouch"))
const ShopingCartLazy = React.lazy(() => import("./Components/shopingCart"))
function App() {
  return (
      <Routes>
        <Route path="/" element={<Suspense fallback={"loading..."}><HomeLazy /></Suspense>} />
        <Route path="/hello" element={<Suspense fallback={"loading..."}><HelloLazy /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={"loading..."}><RegisterLazy /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={"loading..."}><LoginLazy /></Suspense>} />
        <Route path="/userCouch" element={<Suspense fallback={"loading..."}><UserCouchesLazy /></Suspense>} />
        <Route path="/adminCouch" element={<Suspense fallback={"loading..."}><AdminCouchesLazy /></Suspense>} />
        <Route path="/adminCouch/updateCouch/:id" element={<Suspense fallback={"loading..."}><UpdateCouchLazy /></Suspense>} />
        <Route path="/adminCouch/addCouch" element={<Suspense fallback={"loading..."}><AddCouchLazy /></Suspense>} />
        <Route path="/shopingCart" element={<Suspense fallback={"loading..."}><ShopingCartLazy /></Suspense>} />
      </Routes>
  );
}

export default App;