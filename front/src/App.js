// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// componenets:
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

// user componenets:
import RoutWithUserChatComponent from "./components/user/RoutWithUserChatComponent";

// publicly available pages
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";

// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminAnatlytictsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";

// utils
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutWithUserChatComponent />}>
          {/*publicly available pages*/}
          <Route path="*" element="Page not exist 404" />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product-list" element={<ProductListPage />}></Route>
          <Route path="/product-details/:id"element={<ProductDetailsPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>

        {/*user protected routes:*/}

        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />}></Route>
          <Route path="/user/my-orders" element={<UserOrdersPage />}></Route>
          <Route
            path="/user/cart-details"
            element={<UserCartDetailsPage />}
          ></Route>
          <Route
            path="/user/order-details/:id"
            element={<UserOrderDetailsPage />}
          ></Route>
        </Route>

        {/*admin protected routes:*/}

        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersPage />}></Route>
          <Route
            path="/admin/edit-user"
            element={<AdminEditUserPage />}
          ></Route>
          <Route path="/admin/products" element={<AdminProductsPage />}></Route>
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          ></Route>
          <Route
            path="/admin/edit-product"
            element={<AdminEditProductPage />}
          ></Route>
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailsPage />}
          ></Route>
          <Route path="/admin/orders" element={<AdminOrdersPage />}></Route>
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route
            path="/admin/analytics"
            element={<AdminAnatlytictsPage />}
          ></Route>
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
